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
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    info: {
        prescription: [{
            drugName: String,
            dosage: String
        }],
        diagnosis: String,
        nextVisit: this
    },
    state: {
        type: String,
        enum: ['available', 'booked', 'canceled', 'finished'],
        default: 'available'
    }
});

module.exports = mongoose.model('Appointment', schema);