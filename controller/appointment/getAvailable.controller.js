const Appointment = require('../../model/appointment.model');

const getAvailable = async (req, res, next) => {
    try {
        const appointments = await Appointment.find({
            doctor: req.body.id,
            user: { "$exists": false },
            state: 'available'
        })
        if (!appointments) {
            return res.status(404).json({ message: 'Appointment is not found' });
        }
        return res.status(200).json({ data: appointments });
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}

module.exports = { getAvailable }