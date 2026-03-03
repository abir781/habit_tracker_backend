// const mongoose = require('mongoose');

// const habitSchema = new mongoose.Schema({
//   habitname: { type: String, required: true },
//   category: String,
//   frequency: String,
  
// });

// const Habit = mongoose.model('Habit', habitSchema);

// module.exports = Habit;


const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  habitname: { type: String, required: true },
  category: { type: String, required: true },
  frequency: { type: String, required: true },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;