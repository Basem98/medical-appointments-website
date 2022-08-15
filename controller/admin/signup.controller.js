const Admin = require('../../model/admin.model');
const bcrypt = require('bcrypt');


const signUp = async (req, res, next) => {
  try {
    const newAdminData = await (new Admin(req.body)).save();
    res.status(201).json({message: 'Admin signed up successfully'});
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
}

module.exports = signUp;