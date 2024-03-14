const User = require('../models/userModel');

module.exports = {
    async getAllUsers(_, res) {
        try {
            const users = await User.find({}).populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getUserById(_, res) {
        try {
            const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
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
            const User = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
            if (!User) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(User);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
};
