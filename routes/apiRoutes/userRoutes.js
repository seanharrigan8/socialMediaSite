const User = require('../models/user');
const router = express.Router();
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, removeFriend, } = require('../../controllers/userController');
const { getAllThoughts, createThought } = require('../../controllers/thoughtController');

//route to get ALL USERS and create User
router.route('/').get(getAllUsers).post(createUser);


//Route to get, update, and delete by id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);


router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;



// const getAllUsers = async (req, res) => {
//     try { 
//         const users = await User.find();
//         res.json(users);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// };

// //Create a new User
// const createUser = async (req, res) => {
//     try {
//         const newUser = new User (req.body);
//         const user = await newUser.save();
//         res.json(user);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

