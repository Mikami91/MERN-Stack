// Dependencies
const mongoose = require("mongoose");

const URI = 'mongodb://localhost/mern-task';

// Connect
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

// Export
module.exports = mongoose;