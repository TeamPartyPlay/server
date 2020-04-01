const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const { mongoUrl } = process.env;

beforeAll(async () => {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    expect(true).toBe(true);
  });
});

describe('New Test', () => {
  it('should test connection', () => {
    expect(true).toBe(true);
  });
});
