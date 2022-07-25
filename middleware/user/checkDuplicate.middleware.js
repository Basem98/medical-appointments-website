const User = require('../../model/user.model');

const checkDuplicate = async (req, res, next) => {
    let enteredEmail = req.body.email;
    let enteredPhoneNumber = req.body.phoneNumber;

    // Check Duplication for Phone Number
    await User.findOne({ phoneNumber: enteredPhoneNumber }).count()
        .then((count) => {
            if (count == 1) {
                let error = new String("The provided Phone Number is already registered");
                error.statusCode = 400;
                next(error);
            }
        })
        .catch((error) => console.log(error))

    // Check Duplication for email
    await User.findOne({ email: enteredEmail }).count()
        .then((count) => {
            if (count == 1) {
                let error = new String("The provided Email is already registered");
                error.statusCode = 400;
                next(error);
            }
        })
        .catch(error => console.log(error))

    next();

}

module.exports = checkDuplicate;