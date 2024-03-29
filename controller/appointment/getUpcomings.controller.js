const { default: mongoose } = require('mongoose');
const Appointment = require('../../model/appointment.model');

const getUpcomings = (req, res, next) => {
    let currentDate = new Date().toISOString();

    if (!mongoose.isValidObjectId(req.params)) {
        return res.status(404).send({ message: 'Appointment Not Found' });
    }
    if (req.body.id != req.params.id.toString()) {
        return res.status(401).send({ message: 'Not Authorized to see this appointment' });
    }
    Appointment.find({
        "$or": [
            { user: req.params.id },
            { doctor: req.params.id }
        ],
        state: { "$ne": 'finished' },
        user: { "$exists": true },
        date: { "$gt": currentDate }
    })
        .populate('user')
        .populate('doctor')
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: 'Appointment Not Found' });
            }
            return res.status(200).json({ message: data })
        })
        .catch(error => {
            error.statusCode = 500
            next(error);
        })
}

module.exports = { getUpcomings };