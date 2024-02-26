const mongoose = require('mongoose');
require('dotenv').config();



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27-17/socialsitedb', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
    });
    console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
