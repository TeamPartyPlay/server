const request = require('supertest');
const app = require('../../app');


describe('User Endpoint Testing', () => {
  it('Get the Current User without Authorization', async () => {
    const test = await request(app);
    const res = await test.get('/api/user');
    expect(res.statusCode).toBe(401);
  });

  it('Get the Current User with Authorization', async () => {
    const test = await request(app);
    const res = await test.get('/api/user');
    expect(res.statusCode).toBe(401);
  });
});
