const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const InvalidDataError = require('./InvalidDataError');
const EmailIsExistsError = require('./EmailIsExistsError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  NotFoundError,
  UnauthorizedError,
  InvalidDataError,
  EmailIsExistsError,
  ForbiddenError,
};
