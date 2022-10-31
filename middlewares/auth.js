const jwt = require('jsonwebtoken');
const { tokenError, autorizationError } = require('../errors/authError');
const { secretKey } = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw autorizationError;
  } else {
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
    } catch (err) {
      next(tokenError);
    }
    req.user = payload;
  }
  next();
};
