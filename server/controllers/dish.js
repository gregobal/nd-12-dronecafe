const Dish = require('../models/dish.js');

const findAll = (callback) => {
  Dish.find()
    .then(dishes => callback(null, dishes))
    .catch(error => callback(error));
};

module.exports = {
  findAll
};