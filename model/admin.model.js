const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


/* ---------- Hash the admin's password if it's a new/updated collection ---------- */
schema.pre('save', async function (next) {
    let newAdmin = this;
    /** Only hash the password if it was new or modified */
    if (newAdmin.isNew || newAdmin.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
        next();
    }
    return next();
});

module.exports = mongoose.model('Admin', schema);