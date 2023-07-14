class InvalidDataError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 400;
  }
}

module.exports = InvalidDataError;
