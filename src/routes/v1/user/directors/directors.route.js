const express = require("express");
const {createDirector} = require("../../../../controllers/v1/user/directors/directors.controller");

const router = express.Router({mergeParams: true});

router.route('/').post(createDirector);

module.exports = router;
