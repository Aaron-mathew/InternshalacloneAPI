const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.resume = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure Resume page!"});
});