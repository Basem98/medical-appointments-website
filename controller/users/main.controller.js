const { validateUserData } = require('./validation.controller');
const User = require('../../model/user.model');

module.exports.addUser = (req, res, next) => {
    let newUser = new User(req.body);
    bcrypt.hash(req.body.password,10)
        .then((hashedPassword) => { newUser.password = hashedPassword })
        .catch(error => next(error))
    newUser.save()
        .then((data) => res.status(201).json(data))
        .catch(error => next(error))
}

//returns validation array
module.exports.validateUserData = validateUserData