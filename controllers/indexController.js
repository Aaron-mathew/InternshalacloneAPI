const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");


exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "homepage"});
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    res.json(req.body);
});