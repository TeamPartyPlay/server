/* eslint-disable prefer-const */
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { EventModel } = require('../models');
const {
  createTestUser, loginTestUser, deleteTestUser, createTestEvent, joinTestEvent, deleteTestEvent,
} = require('../utils/testing');

const { TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL } = process.env;
const {
  TEST_EVENT_NAME,
  TEST_EVENT_DESC,
  TEST_EVENT_LAT,
  TEST_EVENT_LONG,
  TEST_EVENT_YEAR,
  TEST_EVENT_MONTH,
  TEST_EVENT_DATE,
  TEST_EVENT_HOUR,
  TEST_EVENT_MINUTES,
  TEST_IS_PUBLIC,
} = process.env;


const { mongoUrl } = process.env;
let user = null;
let token = null;
let event = null;
let eventToken = null;

beforeAll(async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  user = await createTestUser(request, app, TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL);
  token = await loginTestUser(request, app, TEST_USERNAME, TEST_PASSWORD);
  event = await createTestEvent(
    request,
    app,
    token,
    TEST_EVENT_NAME,
    TEST_EVENT_DESC,
    user,
    TEST_EVENT_LAT,
    TEST_EVENT_LONG,
    new Date(TEST_EVENT_YEAR, TEST_EVENT_MONTH, TEST_EVENT_DATE, TEST_EVENT_HOUR, TEST_EVENT_MINUTES, 0, 0),
    TEST_IS_PUBLIC,
  );
  eventToken = await joinTestEvent(request, app, token, event._id);
});

afterAll(async () => {
  await deleteTestEvent(request, app, token, event._id);
  await deleteTestUser(request, app, user._id, token);
  await EventModel.deleteMany({ name: 'Kevin\'s Birthday' });
});

describe('Event Testing', () => {
  let testCreatedEvent = null;
  let testCreatedEventToken = null;
  it('Should Get the Current Event', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .set('Cookie', [token, eventToken])
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', TEST_EVENT_NAME);
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
      .get(`/api/event/${event._id}`)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', TEST_EVENT_NAME);
        done();
      });
  }));

  it('Should NOT Get Event by ID With User Authorization', () => new Promise((done) => {
    request(app)
      .get('/api/event/1')
      .set('Cookie', [token])
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(500);
        done();
      });
  }));

  it('Should Post New Event With User Authorization', async () => {
    const req = await request(app);
    const res = await req.post('/api/event')
      .set('Cookie', [token])
      .send({
        name: 'Kevin\'s Birthday',
        description: '22 is just a number',
        lat: 44.473487,
        lng: -73.214005,
        owner: user._id,
        start: new Date(2021, 7, 12, 11, 30),
        end: new Date(2021, 7, 12, 7, 30),
        isPublic: true,
        invites: [],
        attendees: [user._id],
        tags: ['birthday', 'fun'],
      });
    testCreatedEvent = res.body;
    expect(res.status).toBe(200);
  });

  it('Should NOT Post New Event With User Authorization', () => new Promise((done) => {
    request(app)
      .post('/api/event')
      .set('Cookie', [token])
      .send({})
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(500);
        done();
      });
  }));

  it('Should NOT Post New Event WITHOUT User Authorization', () => new Promise((done) => {
    request(app)
      .post('/api/event')
      .set('Cookie', [])
      .send({})
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(401);
        done();
      });
  }));

  it('Should have User Join Event', () => new Promise((done) => {
    request(app)
      .post(`/api/event/join/${event._id}`)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(err).toBe(null);
        [testCreatedEventToken] = res.header['set-cookie'];
        [testCreatedEventToken] = testCreatedEventToken.split(';');
        expect(res.status).toBe(200);
        done();
      });
  }));

  it('Should have User Exit Event', () => new Promise((done) => {
    request(app)
      .post(`/api/event/exit/${event._id}`)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  }));

  it('Should delete Event', () => new Promise((done) => {
    request(app)
      .delete(`/api/event/${testCreatedEvent._id}`)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  }));
});
