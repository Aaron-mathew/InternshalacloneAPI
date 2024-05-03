const mongoose = require("mongoose");

const studentModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [15,"Passwrod should not exceed more than 15 characters"],
        minLength: [6,"Passwrod should should have atleast 6 characters"],
        //match: []

    },
},
{timestamps:true});

const Student = mongoose.model("student", studentModel);

module.exports = Student;

// continue video from{00:13:57}