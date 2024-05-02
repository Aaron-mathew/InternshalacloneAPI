const mongoose = require("mongoose");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Databse Connection Established!');
    } catch (error) {
        console.log(error.message);
    }
}

// continue video from{00:05:06}