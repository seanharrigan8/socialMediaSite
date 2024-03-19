const User = require('../models/user');
const Thought = require('../models/thought');
const Reaction = require('../models/thought');


module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            

            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userID}) 
            .select('-_v')
            .populate('thoughts')
            .populate('friends');

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
            const updatedUser= await User.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true, runValidators: true });
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
            const deletedIser = await User.findByIdAndDelete(req.params.userId);
            if (!deletedIser) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })

            res.json(deletedIser);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const { friend } = req.body;
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId} , 
                    { $push: { friends: friend } }, { runValidators: true, new: true }).populate('friends');

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
            const user = await User.findOneAndUpdate({_id: req.params.userId },
                { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
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