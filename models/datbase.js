const mongoose = require("mongoose");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect("");
        console.log('Databse Connection Established!');
    } catch (error) {
        console.log(error.message);
    }
}

// continue video from{00:02:26}