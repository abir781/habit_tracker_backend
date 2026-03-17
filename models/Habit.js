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
  
  useremail: { type: String, required: true },

  // Start date of the habit
  startDate: { type: Date, required: true, default: Date.now },

  completedDates: { type: [String], default: [] } 

  // Optional: to track completed days
  // completedDates: { type: [Date], default: [] },
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;