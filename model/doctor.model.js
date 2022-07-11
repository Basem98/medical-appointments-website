const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    specialization: {
        type: String,
        required: true
    },
    experiences: [{
        title: {
            type: String,
            required: true
        },
        workplace: {
            type: String,
            required: true
        },
        location: {
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date
        },
        isCurrentlyWorking: {
            type: Boolean,
            default: false
        }
    }],
    education: [{
        degree: {
            type: String,
            required: true
        },
        granter: {
            type: String,
            required: true
        },
        issueDate: {
            type: Date,
            required: true
        }
    }],
    certifications: [{
        title: {
            type: String,
            required: true
        },
        granter: {
            type: String,
            required: true
        },
        issueDate: {
            type: Date,
            required: true
        }
    }],
    clinics: [{
        name: {
            type: String,
            required: true
        },
        address: {
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        geoLocation: {
            longitude: String,
            latitude: String
        },
        phone: {
            type: String,
            required: true,
            unique: true
        }
    }],
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
});

schema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

/* ---------- Hash the doctor's password if it's a new/updated collection ---------- */
schema.pre('save', async function (next) {
    let newDoctor = this;
    /** Only hash the password if it was new or modified */
    if (newDoctor.isNew || newDoctor.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        newDoctor.password = await bcrypt.hash(newDoctor.password, salt);
        next();
    }
    return next();
});

module.exports = mongoose.model('Doctor', schema);