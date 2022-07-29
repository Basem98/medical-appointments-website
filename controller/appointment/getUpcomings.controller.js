const { default: mongoose } = require('mongoose');
const Appointment = require('../../model/appointment.model');

const getUpcomings = (req, res, next) => {
    let currentDate = new Date().toISOString();
    let currentHour = parseInt(new Date().getUTCHours());
    let currentMinute = parseInt(new Date().getUTCMinutes());

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
        ],
        date: {"$gt": currentDate},
        'time.hour': {"$gt": currentHour},
        'time.minutes': {"$gt": currentMinute}
    })
    .populate('time.userId')
    .populate('time.doctorId')
    .then((data) => {
        if(!data) {
            return res.status(404).send({message: 'Appointment Not Found'});
        }
        console.log(data);
        res.status(200).json({message: data})
    })
    .catch(error => {
        error.statusCode = 500
        next(error);
    })
}

module.exports={getUpcomings};