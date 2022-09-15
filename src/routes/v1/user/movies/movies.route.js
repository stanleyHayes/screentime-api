const express = require("express");
const {
    createMovie,
    getMovie,
    getMovies,
    updateMovie
} = require("../../../../controllers/v1/user/movies/movies.controller");

const router = express.Router({mergeParams: true});

router.route('/').post(createMovie);
router.route('/').get(getMovies);
router.route('/:id').get(getMovie);
router.route('/:id').put(updateMovie);

module.exports = router;
