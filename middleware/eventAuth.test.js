const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL } = process.env;
const {
  createTestUser, loginTestUser, deleteTestUser, createTestEvent, joinTestEvent, deleteTestEvent,
} = require('../utils/testing');

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
  await mongoose.connection.close();
});

describe('Event Middleware Testing', () => {
  test('Should pass through Event Token Authorization', () => new Promise((done) => {
    request(app)
      .get('/api/event')
      .set('Cookie', [token, eventToken])
      .end((error, res) => {
        expect(error).toBe(null);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', TEST_EVENT_NAME);
        done();
      });
  }));
  test('should pass through Token Authorization using params', () => new Promise((done) => {
    request(app)
      .get('/api/user?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6WyJnb3YuZWF0b25AZ21haWwuY29tIl0sInNwb3RpZnkiOm51bGwsImV2ZW50IjpudWxsLCJwYXN0RXZlbnRzIjpbXSwiZm9sbG93ZXJzIjpbXSwiZm9sbG93aW5nIjpbXSwicHJvZmlsZSI6bnVsbCwiX2lkIjoiNWU3Mjc3Y2Y0OGIwNzgyMmVjYzBmNTE0IiwidXNlcm5hbWUiOiJrZXZpbmVhdG9uNjAzIiwicGFzc3dvcmQiOiIkMmEkMTAkdzQ0NGY1bzFQM1FhRk5kckZ6OUYvT2NZV01ZclY2aGZCb29TR1dpdTAzV1dhMk9tSC9qVy4iLCJfX3YiOjAsImlhdCI6MTU4NDU2MTA2OX0.1i4faNerWFM29uODLK_HQP-thU4OSXC0vetiF6Y1oOs')
      .end((error, res) => {
        expect(error).toBe(null);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('{"email":["gov.eaton@gmail.com"],"spotify":null,"event":null,"pastEvents":[],"followers":[],"following":[],"profile":null,"_id":"5e7277cf48b07822ecc0f514","username":"kevineaton603","password":"$2a$10$w444f5o1P3QaFNdrFz9F/OcYWMYrV6hfBooSGWiu03WWa2OmH/jW.","__v":0,"iat":1584561069}');
        done();
      });
  }));
  test('Should pass through Event Token Authorization with params', () => new Promise((done) => {
    const url = `/api/event?${token}&${eventToken}`;
    request(app)
      .get(url)
      .end((error, res) => {
        expect(error).toBe(null);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', TEST_EVENT_NAME);
        done();
      });
  }));
  test('Should NOT pass through Token Authorization', async () => {
    const test = await request(app);
    const res = await test.get('/api/event');
    expect(res.text).toBe('{"error":"No User Token"}');
    expect(res.statusCode).toBe(401);
  });
});
