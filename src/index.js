// Dependencies
const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Imports
const { mongoose } = require("./database");

// Server
const app = express();

// Setings
app.set('port', process.env.PORT || 3000)

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/task', require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Port
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});