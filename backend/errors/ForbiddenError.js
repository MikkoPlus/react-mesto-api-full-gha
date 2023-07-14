class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Ошибка прав доступа';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
