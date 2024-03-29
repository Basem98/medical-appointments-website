const User = require('../../model/user.model');
const bycrypt = require('bcrypt');


module.exports.addUser = (req, res, next) => {
    let newUser = new User(req.body);
    newUser.save()
        .then((data) => {
            req.body.id = data._id;
            req.body.role = 'User';
            next();
        })
        .catch(error => {
            error.statusCode = 500;
            next(error)
        });
}