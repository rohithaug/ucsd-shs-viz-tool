// REQUIRE PACKAGES
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        // MONGODB SETUP
        await mongoose.connect(process.env.MONGODB_URI);        

        console.log('Successfully connected to MongoDB...');
    } catch (e) {
        console.log('Error connecting to MongoDB...');
        console.error(e.message);
        // EXIT PROCESS WITH FAILURE
        process.exit(1);
    }
};

module.exports = connectToMongoDB;