const express = require('express');
const mongoose = require('mongoose');
const User = require('../controllers/user.js');

const router = express.Router();

router.post('/', (req, res) => {
  User.findOne(req.body, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      });
    }
    if (!data) {
      User.create(req.body, (err, data) => {
        if (err) {
          return res.status(500).send({
            message: err.message
          });
        } else {
          res.status(200).json(data);
        }
      })
    } else {
      return res.status(200).json(data);
    }
  });
});

router.put('/:id', (req, res) => {
  User.updateCredits(req.params.id, req.body.credits, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      });
    } else {
      if (!data) {
        return res.status(404).send({
          message: 'User not found'
        });
      }
      res.status(200).json(data);
    }
  })
});

module.exports = router;