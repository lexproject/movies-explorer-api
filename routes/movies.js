const routerMovie = require('express').Router();
const { getMoviesUser, createMoviePost, delMovie } = require('../controllers/movies');
const { postIdValidate, movieValidate } = require('../utils/validate');

routerMovie.get('/', getMoviesUser);
routerMovie.post('/', movieValidate, createMoviePost);
routerMovie.delete('/:movieId', postIdValidate, delMovie);

module.exports = routerMovie;
