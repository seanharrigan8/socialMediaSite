const User = require('../models/userModel');
const Thought = require('../models/thoughtModel');
const { db } = require('../models/userModel');


module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.Thought.find({}).populate('thoughts').populate('friends');
            res.json(users)
        }catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
        },

        async getUserById({ params }, res) {
            try {
                const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                console.log(err);
                res.status(400).json(err);
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
        async updateUser(req, res), {
            try {
                const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
                if (!user) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                } res.json(user);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },