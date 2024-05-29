const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Employe Homepage!"});
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email}).select("+password").exec();
    if(!employe) return next(new ErrorHandler("User not found with this email address", 404));

    const isMatch = employe.comparepassword(req.body.password);
    if(!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));

    sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Successfully signout!"});
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email}).exec()
    if(!employe) return next(new ErrorHandler("User not found with this email address", 404));
    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${employe._id}`; //url to send to nodemailer
    sendmail(req, res, next, url);
    employe.resetPasswordToken = "1";
    await employe.save();
    res.json({ employe, url});
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec()
    if(!employe) return next(new ErrorHandler("User not found with this email address", 404));
    if(employe.resetPasswordToken == "1"){
        employe.resetPasswordToken = "0";//only one password can be generated through one link
        employe.password = req.body.password;//will checkin employe model
        await employe.save();
    }else{
        return next(new ErrorHandler("Invalid Reset Password Link! Please try again", 500));
    }
    res.status(200).json({
        message: "Password has been successfully changed",
    })
});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    employe.password = req.body.password;
    await employe.save();
    sendtoken(employe, 201, res);
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        success: true,
        message: "employe Updated Successfully!",
    });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedFilename =`resumebuilder-${Date.now()}${path.extname(file.name)}`;
    if(employe.organizationlogo.fileId !== ""){
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    }

    const { fileId,url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFilename,
    });
    employe.organizationlogo = { fileId, url };
    await employe.save()
    res.status(200).json({
        success: true,
        message: "Profile Updated!",
    });
});


// {10th Video}