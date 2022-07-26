const User = require('../../model/user.model');
const { default: mongoose } = require('mongoose');

module.exports.deleteUserById = (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ message: 'User is Not Found' });
    }
    if (req.body.id.toString() != req.params.id) {
        return res.status(401).send({ message: 'Unauthorized to delete user data' });
    }
    User.deleteOne({ _id: req.body.id })
        .then((data) => {
            if (!data.deletedCount) {
                return res.status(404).send({ message: 'User is Not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        })
        .catch(error => next(error))
}
