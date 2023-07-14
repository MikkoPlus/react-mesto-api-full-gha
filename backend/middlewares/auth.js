const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || 'SECRET-KEY');
  } catch (err) {
    next(new UnauthorizedError());
  }
  req.user = payload;
  next();
};

module.exports = auth;
