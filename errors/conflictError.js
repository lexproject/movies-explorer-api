class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}
const dubleEmailError = new ConflictError('Пользователь с такими данными email уже существует.');
module.exports = { dubleEmailError };
