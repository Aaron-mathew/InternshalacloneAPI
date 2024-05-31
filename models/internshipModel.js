const mongoose = require("mongoose");


const internshipModel = new mongoose.Schema({
    profile: String,
    skill: String,
    internshiptype: {type: String, enum: ["In office", "Remote"]},
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status:{
            type: String, 
            enum: ["Fixed", "Negotiable", "Performancebased", "Unpaid"]
        },
        amount: Number,
    },
    perks: String,
    assesments: String,
},
{timestamps:true});


const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;

