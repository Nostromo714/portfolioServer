const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from the .env file


// Load the URI from .env file
const MONGO_URI = process.env.MONGO_URI;


const dbConnect = async () => {
    try {
        await mongoose.connect(MONGO_URI), 
        console.log('Database connected successfully');
    } catch (err) {
        console.error(`Database connection error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};
module.exports = { dbConnect, mongoose };
