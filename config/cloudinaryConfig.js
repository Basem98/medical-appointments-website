const { v2: cloudinary } = require('cloudinary');
const config = require('./envConfig');

const cloudinaryConfig = () => cloudinary.config({
  cloud_name: config.CLOUDINARY.NAME,
  api_key: config.CLOUDINARY.KEY,
  api_secret: config.CLOUDINARY.SECRET
});

module.exports = { cloudinaryConfig, uploader: cloudinary.uploader }