const express = require("express");

const router = express.Router({mergeParams: true});

const directorRoutes = require("./directors/directors.route");

router.use('/directors', directorRoutes);
router.use('/director', directorRoutes);

module.exports = router;
