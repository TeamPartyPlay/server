const request = require('supertest');
const mongoose = require('mongoose');
const { UserModel } = require('../models');
const app = require('../app');

const { mongoUrl } = process.env;

beforeAll(async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Event Testing', () => {
  it('Should Get the Current Event', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        done();
      });
  }));

  it('Should NOT get the Current Event', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        done();
      });
  }));

  it('Should Get Event by ID', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        done();
      });
  }));

  it('Should NOT Get Event by ID', () => new Promise((done) => {
    request(app)
      .get('/api/event/1')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(500);
        done();
      });
  }));

  it('Should Post New Event', () => new Promise((done) => {
    done();
  }));

  it('Should have User Join Event', () => new Promise((done) => {
    done();
  }));

  it('Should have User Exit Event', () => new Promise((done) => {
    done();
  }));

  it('Should delete Event', () => new Promise((done) => {
    done();
  }));
});
