const mongoose = require('mongoose');
const validator = require('validator');
const { movieNotFaund } = require('../errors/notFaundError');
const { permisionError } = require('../errors/permisionError');
const { messageErrorLink } = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: messageErrorLink,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: messageErrorLink,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: messageErrorLink,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

movieSchema.statics.verificMovieByUser = function verificMovieByUser(movieId, userId) {
  return this.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(movieNotFaund);
      }
      if (userId !== movie.owner._id.toString()) {
        return Promise.reject(permisionError);
      }
      return this.findByIdAndRemove(movieId)
        .then((movieDeleted) => movieDeleted);
    });
};

module.exports = mongoose.model('movie', movieSchema);
