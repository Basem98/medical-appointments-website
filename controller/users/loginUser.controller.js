const User = require('../../model/user.model');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');

module.exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                return res.status(400).json({ message: 'Incorrect email or password' });
            }
            bycrypt.compare(req.body.password, data.password)
                .then((isCorrectPassword) => {
                    if (!isCorrectPassword) {
                        return res.status(400).json({ message: 'Incorrect email or password' });
                    }
                    const tokenOptions = { expiresIn: "24h" };
                    tokenOptions.expiresIn = rememberMe ? ("30d") : tokenOptions.expiresIn;
                    let token = jwt.sign({
                        id: data._id,
                        role: 'user'
                    }, envConfig.AUTH.USER_SECRET, tokenOptions);
                    return res.status(200)
                        .cookie('accessToken', token, {
                            maxAge: tokenOptions.expiresIn,
                            secure: true,
                            httpOnly: true,
                        })
                        .json({message: 'Signed in successfully', id: data._id})
                })
                .catch((error) => {
                    error.statusCode = 500;
                    next(error);
                });
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        })
}