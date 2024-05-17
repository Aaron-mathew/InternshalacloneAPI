const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Homepage!"});
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).select("+password").exec();
    if(!student) return next(new ErrorHandler("User not found with this email address", 404));

    const isMatch = student.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

    sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!"});
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).exec()
    if(!student) return next(new ErrorHandler("User not found with this email address", 404));
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`; //url to send to nodemailer
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();
    res.json({ student, url});
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec()
    if(!student) return next(new ErrorHandler("User not found with this email address", 404));
    if(student.resetPasswordToken == "1"){
        student.resetPasswordToken = "0";//only one password can be generated through one link
        student.password = req.body.password;//will checkin student model
        await student.save();
    }else{
        return next(new ErrorHandler("Invalid Reset Password Link! Please try again", 500));
    }
    res.status(200).json({
        message: "Password has been successfully changed",
    })
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res);
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student Updated Successfully!",
    });
});
