const request = require('supertest');
const mongoose = require('mongoose');
const {
  createTestUser, loginTestUser, deleteTestUser, createTestEvent, joinTestEvent, deleteTestEvent,
} = require('utils/testing');
const app = require('../app');


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
});

describe('Vote Room Playlist Testing', () => {
  it('Should GET Current Playlist', async () => {
    const req = await request(app);
    const res = await req
      .get('/api/playlist')
      .set('Cookie', [token, eventToken]);

    expect(res.status).toBe(200);
  });

  it('Should GET Playlist by ID', async () => {
    const req = await request(app);
    const res = await req
      .get(`/api/playlist/${1}`)
      .set('Cookie', [token]);
    expect(res.status).toBe(200);
  });

  it('Should POST a New Playlist for current Event', async () => {
    const req = await request(app);
    const res = await req
      .post('/api/playlist/')
      .set('Cookie', [token, eventToken]);
    expect(res.status).toBe(200);
  });

  it('Should POST a New PLaylist by ID', async () => {
    const req = await request(app);
    const res = await req
      .post(`/api/playlist/${1}`)
      .set('Cookie', [token]);
    expect(res.status).toBe(200);
  });

  it('Should POST a song to the playlist', async () => {
    const req = await request(app);
    const res = await req
      .put('/api/playlist')
      .set('Cookie', [token, eventToken])
      .send({
        // TrackId
      });
  });

  it('Should NOT POST a repeated song', async () => {
    const req = await request(app);
    const res = await req
      .put('/api/playlist')
      .set('Cookie', [token, eventToken])
      .send({
        // TrackId
      });
  });

  it('Should POST a Vote', async () => {
    const req = await request(app);
    const res = await req
      .post('/api/playlist/vote')
      .set('Cookie', [token])
      .send({
        // TrackId
      });
    expect(res.status).toBe(200);
  });

  it('Should DELETE Playlist for Current Event', async () => {
    const req = await request(app);
    const res = await req
      .delete('/api/playlist')
      .set('Cookie', [token, eventToken]);
    expect(res.status).toBe(200);
  });

  it('Should DELETE Playlist by Id', async () => {
    const req = await request(app);
    const res = await req
      .delete(`/api/playlist/${1}`)
      .set('Cookie', [token]);
    expect(res.status).toBe(200);
  });
});
