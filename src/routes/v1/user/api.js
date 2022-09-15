const express = require("express");

const router = express.Router({mergeParams: true});

const directorRoutes = require("./directors/directors.route");
const movieRoutes = require("./movies/movies.route");

router.use('/directors', directorRoutes);
router.use('/director', directorRoutes);

router.use('/movies', movieRoutes);
router.use('/movie', movieRoutes);

module.exports = router;
