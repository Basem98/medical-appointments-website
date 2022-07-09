const mongoose = require('mongoose');

module.exports.connectToDatabase = function(db_url) {
  mongoose.connect(db_url)
  .then(() => console.log(`Server has successfully connected to the database!`))
  .catch((err) => console.error(err));
}