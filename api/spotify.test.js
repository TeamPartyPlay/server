const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { TEST_USERNAME, TEST_PASSWORD, TEST_EMAIL } = process.env;
const { createTestUser, loginTestUser, deleteTestUser } = require('../utils/testing');

const { mongoUrl, clientSecret, clientId } = process.env;
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

describe('Spotify Endpoint Testing', () => {
  it('Should get Spotify Application Secrets', async () => {
    const test = await request(app);
    const res = await test
      .get('/api/spotify/secret')
      .set('Cookie', [token]);
    expect(res.text).toBe(`{"clientId":"${clientId}","clientSecret":"${clientSecret}"}`);
    expect(res.status).toBe(200);
  });
  it('Should get users spotify tokens/information', async () => {
    expect(true).toBe(false);
  });
});
