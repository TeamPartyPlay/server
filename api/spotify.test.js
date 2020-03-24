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

});

describe('Sample Test', () => {
  it('should test that true === true', async () => {
    expect(true).toBe(true);
  });
});
