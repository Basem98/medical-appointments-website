const { default: mongoose } = require('mongoose');
const Appointment = require('../../model/appointment.model');

const getUpcomings = (req, res, next) => {
    if(!mongoose.isValidObjectId(req.params)) {
        return res.status(404).send({message: 'Appointment Not Found'});
    }
    if(req.body.id != req.params.id.toString()) {
        return res.status(401).send({message: 'Not Authorized to see this appointment'});
    }
    Appointment.find({
        "$or": [
            {'time.userId': req.params.id},
            {'time.doctorId': req.params.id}
        ]
    })
    .populate('time.userId')
    .populate('time.doctorId')
    .then((data) => {
        if(!data) {
            return res.status(404).send({message: 'Appointment Not Found'});
        }
        res.status(200).json({message: data})
    })
    .catch(error => {
        error.statusCode = 500
        next(error);
    })
}

module.exports={getUpcomings};