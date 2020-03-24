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

describe('Sample Test', () => {
  it('should test that true === true', async () => {

  });
});
