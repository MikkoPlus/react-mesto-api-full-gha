class EmailIsExistsError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с таким email уже существует';
    this.statusCode = 409;
  }
}

module.exports = EmailIsExistsError;
