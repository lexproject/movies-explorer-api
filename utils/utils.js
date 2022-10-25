const dbase = 'mongodb://localhost:27017/moviesdb';
const secretKey = '0123456789';
const messageErrorLink = 'Введённое поле должно быть ссылкой!';
const linkValid = /^https?:\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

module.exports = {
  dbase, secretKey, messageErrorLink, linkValid,
};
