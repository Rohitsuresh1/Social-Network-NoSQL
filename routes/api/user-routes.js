const router = require("express").Router();

const { getAllUsers,createUser,deleteUser,updateUser,getUserById,addFriend,deleteFriend } = require('../../controllers/user-controllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').put(updateUser).get(getUserById).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;