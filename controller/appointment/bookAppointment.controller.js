const { default: mongoose } = require("mongoose");
const Appointment = require("../../model/appointment.model");
const User = require("../../model/user.model");

const bookAppointment = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params)) {
        return res.status(404).json({ message: 'Appointment is not found' });
    }
    Appointment.findById(req.params.id)
        .then(async (appointment) => {
            if(!appointment) {
                return res.status(404).json({message: 'Appointment is not found'});
            }
            if(!appointment.user) {
                let userId = req.body.id;
                appointment.user = userId;
                let user = await User.findById(userId);
                user.appointments.push(appointment._id);
                appointment.state = 'booked';
                await appointment.save();
                await user.save();
                return res.status(201).json({message: `Appointment booked successfully at ${appointment.date}`})
            }
            return res.status(409).json({message: 'Appointment is taken'})
        })
        .catch((error) => {
            error.statusCode = 500;
            next(error);
        })
}

module.exports = { bookAppointment }