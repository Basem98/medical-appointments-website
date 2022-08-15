const bcrypt = require('bcrypt');
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
}, { timestamps: true });

schema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

/* ---------- Hash the user's password if it's a new/updated collection ---------- */
schema.pre('save', async function (next) {
    let newUser = this;
    /** Only hash the password if it was new or modified */
    if (newUser.isNew || newUser.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        next();
    }
    return next();
});


module.exports = mongoose.model('User', schema);