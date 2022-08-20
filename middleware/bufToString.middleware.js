const DataUri = require('datauri/parser');
const dUri = new DataUri();

const formatBufferUsingExt = (file) => dUri.format(file.originalname, file.buffer);

const bufferFileToString = (req, res, next) => {
  try {
    if (req.file) {
      req.file = formatBufferUsingExt(req.file).content;
    } else if (req.files.length > 0) {
      req.files = req.files.map(file => formatBufferUsingExt(file).content)
    } else {
      throw new Error('There are no files to upload');
    }
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
}

module.exports = bufferFileToString;