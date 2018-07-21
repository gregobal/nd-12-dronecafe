const express = require('express');
const mongoose = require('mongoose');
const drone = require('netology-fake-drone-api');
const Order = require('../controllers/order.js');
const User = require('../controllers/user.js');

const router = express.Router();

module.exports = function (io) {
  router.get('/', (req, res) => {
    Order.findAll(req.query, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      } else {
        if (!data) {
          return res.status(404).send({
            message: 'Orders not found'
          });
        }
        res.status(200).json(data);
      }
    });
  });

  router.post('/', (req, res) => {
    Order.create(req.body, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      } else {

        res.status(200).json(data);

        io.emit('order created');
      }
    });
  });

  router.put('/:id', (req, res) => {
    Order.updateStatus(req.params.id, req.body.status, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      } else {
        if (!data) {
          return res.status(404).send({
            message: 'Order not found'
          });
        }
        res.status(200).json(data);

        io.emit('order changed', data);

        if (req.body.status === 'delivering') {
          drone
            .deliver()
            .then(() => {
              Order.updateStatus(req.params.id, 'delivered', (err, order) => {
                if (order) {
                  io.emit('order changed', order);

                  // delete order
                  setTimeout(() => {
                    Order.remove(req.params.id, (err, data) => {
                      if (data) {
                        io.emit('order deleted', order);
                      }
                    });
                  }, 120000);
                }
              });
            })
            .catch(() => {
              Order.updateStatus(req.params.id, 'problem', (err, order) => {
                if (order) {
                  io.emit('order changed', order);

                  // refund credits to user
                  User.findOne(order.user, (err, data) => {
                    if (data) {
                      let refund = data.credits + order.dish.price;
                      User.updateCredits(order.user._id, refund, (err, data) => {
                        io.emit('refund');
                      })
                    }
                  });

                  // delete order
                  setTimeout(() => {
                    Order.remove(req.params.id, (err, data) => {
                      if (data) {
                        io.emit('order deleted', order);
                      }
                    });
                  }, 120000);
                }
              });
            });
        }
      }
    })
  });

  router.delete('/:id', (req, res) => {
    Order.remove(eq.params.id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      } else {
        res.status(200).json(data);
      }
    });
  });

  router.delete('/', (req, res) => {
    Order.removeAll((err, data) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        });
      } else {
        res.status(200).json(data);
      }
    });
  });

  return router;
};