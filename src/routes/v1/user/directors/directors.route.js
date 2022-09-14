const express = require("express");
const {
    createDirector,
    getDirector,
    updateDirector,
    getDirectors
} = require("../../../../controllers/v1/user/directors/directors.controller");

const router = express.Router({mergeParams: true});

router.route('/').get(getDirectors);
router.route('/').post(createDirector);
router.route('/:id').get(getDirector);
router.route('/:id').put(updateDirector);

module.exports = router;
