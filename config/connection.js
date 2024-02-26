const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27-17/socialsitedb', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
      
    });
    console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
