const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
    const token = jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {
        expiresIn: '3600s',
    })

    // set token as http-only-cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    })
}

module.exports = generateToken