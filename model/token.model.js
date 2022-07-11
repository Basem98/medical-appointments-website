const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String
  },
  expireAt: {
    type: Date,
    expires: 21600
  }
});

/* ---------- Generate a 128-bit token to be used as a verification token ---------- */
tokenSchema.pre('save', async function (next) {
  let newTokenData = this;
  if (newTokenData.isNew) {
    newTokenData.token = uuid().replace(/-/g, '_');
    newTokenData.expireAt = Date.now();
  }
  return next();
});


module.exports = mongoose.model('Token', tokenSchema);