const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const schema = {
  id: {
    type: String,
    default: shortid.generate
  },
  from: String,
  to: String,
  createdAt: {
    type: Number,
    default: Date.now,
  },
};

const feedSchema = new Schema(schema);

const Feed = mongoose.model('Feeds', feedSchema);

module.exports = {
  Feed,
  schema,
};
