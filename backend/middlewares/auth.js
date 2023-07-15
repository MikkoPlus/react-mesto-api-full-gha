const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  if (!token) {
    next(new UnauthorizedError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'my-secret-key',
    );
  } catch (err) {
    next(new UnauthorizedError());
  }
  req.user = payload;
  next();
};

module.exports = auth;
