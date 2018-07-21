const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model('User', UserSchema);