const User = require('../../model/user.model');
const { default: mongoose } = require('mongoose');



module.exports.getUserById = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.params.id.toString() != req.body.id) {
        return res.status(401).json({ message: 'Unauthorized to show user data' });
    }
    User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
        .populate('appointments')
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'User is Not Found' })
            }
            else {
                data.password = undefined; // Exclude user password from retrieved data
                return res.status(200).json(data);
            }
        })
        .catch(error => {
            error.statusCode = 500;
            next(error);
        });
}
