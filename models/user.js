const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { loginError } = require('../errors/authError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Введённое поле должно быть Email адресом!',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, {
  toObject: { useProjection: true, versionKey: false },
  toJSON: { useProjection: true, versionKey: false },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(loginError);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(loginError);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
