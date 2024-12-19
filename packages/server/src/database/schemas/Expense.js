const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = {
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['Groceries', 'Clothing', 'Transport', 'Entertainment', 'Bills', 'Other'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
  },
};

const expenseSchema = new Schema(schema);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = {
    Expense,
    schema,
};