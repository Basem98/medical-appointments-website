const multer = require('multer');


/* ---------- Configure the storage for multer ---------- */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, './public'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`)
// });
const storage = multer.memoryStorage();
/* ---------- Configure the middleware that extracts the image from request ---------- */
const upload = multer({ storage });


module.exports = upload;