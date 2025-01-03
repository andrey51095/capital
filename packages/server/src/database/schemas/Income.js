const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Salary', 'Bonus', 'Investment', 'Freelance', 'Other'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Income', incomeSchema);