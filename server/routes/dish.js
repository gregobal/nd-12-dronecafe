const express = require('express');
const mongoose = require('mongoose');
const Dish = require('../controllers/dish.js');

const router = express.Router();

router.get('/', (req, res) => {
  Dish.findAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      });
    } else {
      if (!data || !data.length) {
        return res.status(404).send({
          message: 'Dishes not found'
        });
      }
      res.status(200).json(data);
    }
  });
});

module.exports = router;