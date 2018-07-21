const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  title: String,
  image: String,
  rating: Number,
  ingredients: Array,
  price: Number
});

module.exports = mongoose.model('Dish', DishSchema);