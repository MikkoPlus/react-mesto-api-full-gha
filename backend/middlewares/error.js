const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = statusCode === 500 ? 'Iternal server error' : err.message;

  res.status(statusCode).send({ message: errMessage });
  next();
};

module.exports = errorHandler;
