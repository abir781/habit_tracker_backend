const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: Number,
  frequency: String,
  status: { type: String, default: "pending" }
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;