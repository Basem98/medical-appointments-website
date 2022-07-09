const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }],
    isVerified: {
        type: Boolean,
        default: false
    }
});

schema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

module.exports = mongoose.model('User', schema);