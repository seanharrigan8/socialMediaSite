const router = require("express").Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");


//route to get ALL USERS and create User
router.route("/")
.get(getAllUsers)
.post(createUser);

//get single user, update user, delete user
router.route("/:userId")
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//add friend
router.route("/:userId/friends")
.post(addFriend)
//delete friend
router.route("/:userId/friends/:friendId").delete(removeFriend);


module.exports = router;
