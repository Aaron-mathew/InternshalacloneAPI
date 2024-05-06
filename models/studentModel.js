const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

studentModel.pre("save", function() {
    if(!this.isModified("password")){
        return;
    }//it will make the code work only when the password is changed
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});
//will work before saving studentModel

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
}//copares password using bcrypt

const Student = mongoose.model("student", studentModel);

module.exports = Student;

