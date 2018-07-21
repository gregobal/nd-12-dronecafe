const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dish: {
    type: Schema.Types.ObjectId,
    ref: 'Dish',
    required: true
  },
  status: {
    type: String,
    enum: ['ordered', 'cooking', 'delivering', 'problem', 'delivered'],
    default: 'ordered'
  },
  created: {
    type: Date,
    default: Date.now
  },
  started: Date,
  finished: Date
});

module.exports = mongoose.model('Order', OrderSchema);