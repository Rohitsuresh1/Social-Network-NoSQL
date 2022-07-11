const router = require("express").Router();

const { getAllUsers,createUser,deleteUser,updateUser,getUserById } = require('../../controllers/user-controllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').put(updateUser).get(getUserById).delete(deleteUser);

module.exports = router;