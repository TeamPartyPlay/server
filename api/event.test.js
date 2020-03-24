/* eslint-disable prefer-const */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL } = process.env;
const { createTestUser, loginTestUser, deleteTestUser } = require('../utils/testing');

const { mongoUrl } = process.env;
let user = null;
let token = null;

beforeAll(async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  user = await createTestUser(request, app, TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL);
  token = await loginTestUser(request, app, TEST_USERNAME, TEST_PASSWORD);
});

afterAll(async () => {
  await deleteTestUser(request, app, user._id, token);
});

describe('Event Testing', () => {
  let eventId = '';
  let userId = '';

  it('Should Get the Current Event', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should NOT get the Current Event', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should Get Event by ID', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  }));

  it('Should NOT Get Event by ID With User Authorization', () => new Promise((done) => {
    request(app)
      .get('/api/event/1')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(500);
        done();
      });
  }));

  it('Should Post New Event With User Authorization', () => new Promise((done) => {
    request(app)
      .post('/api/event')
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  }));

  it('Should NOT Post New Event With User Authorization', () => new Promise((done) => {
    request(app)
      .post('/api/event')
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  }));

  it('Should NOT Post New Event WITHOUT User Authorization', () => new Promise((done) => {
    request(app)
      .post('/api/event')
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should have User Join Event', () => new Promise((done) => {
    request(app)
      .post(`/api/event/join/${1}`)
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should have User Exit Event', () => new Promise((done) => {
    request(app)
      .post(`/api/event/exit/${1}`)
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should delete Event', () => new Promise((done) => {
    request(app)
      .delete(`/api/event/${1}`)
      .set('Cookie', [])
      .send({

      })
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));
});
