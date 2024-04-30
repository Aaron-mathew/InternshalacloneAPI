exports.generatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        errName: err.name,
        // stack: err.stack,
//This will handle our synchronus error {video= 0:10:42}
    });
};