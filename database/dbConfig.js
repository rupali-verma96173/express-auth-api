const mongoose = require('mongoose');

const connectDB = async () => {
    try {
         await mongoose.connect('mongodb://localhost:27017/user_db');
        //        await mongoose.connect("process.env.MONGO_URI");

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;