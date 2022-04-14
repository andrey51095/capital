const mongoose = require('mongoose');
const shortid = require('shortid');

const {CURRENCY} = require('../../constants');

const Schema = mongoose.Schema;

const schema = {
  id: {
    type: String,
    default: shortid.generate
  },
  amount: Number,
  description: String,
  storage: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: 0,
  },
  deletedAt: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    enum: CURRENCY,
  }
};

const moneyBundle = new Schema(schema);

const MoneyBundle = mongoose.model('MoneyBundles', moneyBundle);

module.exports = {
  MoneyBundle,
  schema,
};
