const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

const User = require('../models/user');
const {
  NotFoundError,
  UnauthorizedError,
  InvalidDataError,
  EmailIsExistsError,
} = require('../errors/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      next(new NotFoundError('Пользователь с таким _id не найден'));
    })
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  // Получаю из тела запроса пароль, хеширую при помощи bcrypt
  bcrypt
    .hash(String(req.body.password), 10)
    .then((hashedPassword) => {
      // Создаю пользователя
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new InvalidDataError());
          } else if (err.code === 11000) {
            next(new EmailIsExistsError(err));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFoundError('Пользователь с таким _id не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError(''));
      } else {
        next(err);
      }
    });
};

const updateUserData = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      next(new NotFoundError('Пользователь с таким _id не найден'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError());
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .orFail(() => {
      next(new UnauthorizedError());
    })
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          // создал jwt
          const jwt = jsonWebToken.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET || 'SECRET-KEY',
            { expiresIn: '7d' },
          );
          // Прикрепил к куке
          res.cookie('jwt', jwt, {
            httpOnly: true,
            sameSite: true,
          });
          res.send({ data: user.toJSON() });
        } else {
          next(new UnauthorizedError());
        }
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserData,
  updateUserAvatar,
  login,
  getUserInfo,
};
