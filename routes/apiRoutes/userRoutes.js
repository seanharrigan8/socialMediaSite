const User = require('../models/user');


const getAllUsers = async (req, res) => {
    try { 
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json(err);
    }
};

//Create a new User
const createUser = async (req, res) => {
    try {
        const newUser = new User (req.body);
        const user = await newUser.save();
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

