const User = require('../models/user');
const Thought = require('../models/thought');
const Reaction = require('../models/thought');



userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({}).populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json({
                ...user.toObject(), 
                friendCount: user.friends.length,
            thoughtCount: user.thoughts.length

            });
            
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser= await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json({ message: 'User deleted!' }); 
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
};


module.exports = userController;
