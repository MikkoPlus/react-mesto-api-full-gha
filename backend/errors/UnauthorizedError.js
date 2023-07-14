class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Ошибка авторизации';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
