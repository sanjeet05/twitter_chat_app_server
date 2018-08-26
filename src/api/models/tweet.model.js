const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  twid: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  author: {
    type: String,
  },
  avatar: {
    type: String,
  },
  body: {
    type: String,
  },
  date: {
    type: Date,
  },
  screenname: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Tweet', tweetSchema);
