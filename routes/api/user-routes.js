const router = require("express").Router();

const { getAllUsers,createUser } = require('../../controllers/user-controllers');

router.route('/').get(getAllUsers).post(createUser);

module.exports = router;