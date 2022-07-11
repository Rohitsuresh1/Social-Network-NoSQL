const router = require("express").Router();

const { getAllThoughts, createThought } = require ('../../controllers/thought-controllers');

router.route("/").get(getAllThoughts).post(createThought);

module.exports = router;