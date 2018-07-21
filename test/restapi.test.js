const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

describe('REST API', () => {
  let server;

  before((done) => {
    require('../index');

    setTimeout(() => {
      server = supertest.agent('http://localhost:3000');
      done();
    }, 2000);
  });

  describe('Model User', () => {

    it('GET /users, should return 404 code', done => {
      server
        .get('/users')
        .expect(404)
        .end((err, res) => {
          done();
        })
    });

    it('POST /users, without data should return 404 code', done => {
      server
        .get('/users')
        .expect(500)
        .end((err, res) => {
          done();
        })
    });

    it('POST /users, with data should return Object', done => {
      server
        .post('/users')
        .send({
          "email": "test@test.ru", "name": "Test"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            "credits": 100,
            "_id": "5b521655d7031702b0adeb39",
            "email": "test@test.ru",
            "name": "Test",
            "__v": 0
          });
          done();
        })
    });

  });


  describe('Model Dish', () => {

    it('GET /dishes, should return array with 100 length', done => {
      server
        .get('/dishes')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a('array');
          res.body.length.should.be.eql(100);
          done();
        })
    });
  });

  describe('Model Order', () => {

    it('GET /orders, should return 200 code', done => {
      server
        .get('/orders')
        .expect(200)
        .end((err, res) => {
          done();
        })
    });

    it('POST /orders, with data should return Object', done => {
      server
        .post('/orders')
        .send({
          "dish": "5b18641c01f143530a6d75ca", "user": "5b521655d7031702b0adeb39"
        })
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property("status", "ordered");
          expect(res.body.dish).to.have.property("_id", "5b18641c01f143530a6d75ca");
          expect(res.body).to.have.property("user", "5b521655d7031702b0adeb39");
          done();
        })
    });

    it('DELETE /orders, should return status is 200', done => {
      server
        .delete('/orders')
        .expect(200)
        .end((err, res) => {
          done();
        })
    });
  });
});