class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataError';
    this.statusCode = 400;
  }
}
const userLoginError = new DataError('Переданы некорректные данные при авторизации');
const userCreateError = new DataError('Переданы некорректные данные при создании пользователя');
const userUpdateError = new DataError('Переданы некорректные данные при обновлении пользователя');
const movieCreateError = new DataError('Переданы некорректные данные при создании карточки фильма');
module.exports = {
  userCreateError,
  userUpdateError,
  movieCreateError,
  userLoginError,
};
