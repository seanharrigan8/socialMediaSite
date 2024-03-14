const express = require("express");
const router = express.Router();
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
router.route("/").get(getAllUsers).post(createUser);

//Route to get, update, and delete by id

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
