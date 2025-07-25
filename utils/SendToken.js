exports.sendtoken = (employe, statusCode, res) => {
    const token = employe.getjwttoken(); //getting token from studentsignup or studentsign from getjwttoken
    //we need to put this token in cookies to send it forward
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 //miliseconds to 1day
        ),
        httpOnly: true,
        // secure: true,
    };

    res.status(statusCode).cookie("token", token, options).json({ success: true, id: employe._id, token});

};

