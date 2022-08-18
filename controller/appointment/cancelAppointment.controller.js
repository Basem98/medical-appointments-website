const Appointment = require('../../model/appointment.model');

const cancelAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        appointment.state = 'canceled';
        await appointment.save();
        return res.state(204).json({message: 'Appointment cancelled successfully'});
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}

module.exports = { cancelAppointment }