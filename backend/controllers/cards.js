const Card = require('../models/card');
const {
  NotFoundError,
  ForbiddenError,
  InvalidDataError,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InvalidDataError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (card) {
      if (String(card.owner) === req.user._id) {
        Card.deleteOne({ _id: req.params.cardId })
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    } else {
      next(new NotFoundError('Карточка с переданным _id не найдена'));
    }
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const oldCard = await Card.findById(req.params.cardId);

    if (!oldCard) {
      next(new NotFoundError('Карточка с переданным _id не найдена'));
      return;
    }

    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    );

    res.send(card);
  } catch (err) {
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const oldCard = await Card.findById(req.params.cardId);

    if (!oldCard) {
      next(new NotFoundError('Карточка с переданным _id не найдена'));
      return;
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: _id } },
      { new: true },
    );
    res.send(card);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
