const moviePost = require('../models/movie');
const { movieNotFaund } = require('../errors/notFaundError');
const { movieCreateError } = require('../errors/dataError');

module.exports.createMoviePost = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  moviePost.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink: trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      console.log(err.message);
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(movieCreateError);
      } else {
        next(err);
      }
    });
};

module.exports.getMoviesUser = (req, res, next) => {
  moviePost.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.delMovie = (req, res, next) => {
  const { movieId } = req.params;
  return moviePost.verificMovieByUser(movieId, req.user._id)
    .then((movie) => {
      if (!movie) { return Promise.reject(movieNotFaund); }
      return res.send({ message: `Фильм ${movie.nameRU} был успешно удален из сохранёных` });
    })
    .catch(next);
};
