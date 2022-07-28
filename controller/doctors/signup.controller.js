const Doctor = require('../../model/doctor.model');

async function signUp(req, res, next) {
    try {
        const newDoctor = new Doctor(req.body);
        if (!newDoctor) {
            throw new Error('Failed to create a new document');
        }
        await newDoctor.save();
        req.body.id = newDoctor._id;
        req.body.role = 'Doctor';
        next();
    } catch (err) {
        console.error(err);
        err.statusCode = 500;
        next(err);
    }
}

module.exports=signUp;