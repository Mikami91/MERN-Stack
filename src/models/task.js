// Dependencies
const mongoose = require("mongoose");

// Schemas
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

// Export
module.exports = mongoose.model('Task', TaskSchema);