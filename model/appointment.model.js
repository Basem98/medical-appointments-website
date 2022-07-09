const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        hour: {
            type: Number,
            min: 0,
            max: 23,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'Hour must be an integer value.'
            }
        },
        minute: {
            type: Number,
            min: 0,
            max: 59,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'Minute must be an integer value.'
            }
        },
        duration: {
            type: Number,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        },
        info: {
            prescription: [{
                drugName: String,
                dosage: String
            }],
            diagnosis: String,
            nextVisit: this
        }
    }
});

module.exports = mongoose.model('Appointment', schema);