class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
