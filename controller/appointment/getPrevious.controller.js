const Appointment = require("../../model/appointment.model");
const mongoose = require("mongoose");

const getPrevious = (req, res, next) => {
    let currentDate = new Date().toISOString();
    console.log(req.params.id)
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
        date: {"$lt": currentDate},
        user: {"$exists": true}
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

module.exports = { getPrevious }