const request = require('supertest');
const app = require('../../app');


describe('User Endpoint Testing', () => {
  it('Get the Current User without Authorization', async () => {
    const test = await request(app);
    const res = await test.get('/api/user');
    expect(res.statusCode).toBe(401);
    expect(res.text).toBe('{"error":"No User Token"}');
  });

  it('Get the Current User with Authorization', () => new Promise((done) => {
    request(app)
      .get('/api/user')
      .set('Cookie', ['token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6WyJnb3YuZWF0b25AZ21haWwuY29tIl0sInNwb3RpZnkiOm51bGwsImV2ZW50IjpudWxsLCJwYXN0RXZlbnRzIjpbXSwiZm9sbG93ZXJzIjpbXSwiZm9sbG93aW5nIjpbXSwicHJvZmlsZSI6bnVsbCwiX2lkIjoiNWU3Mjc3Y2Y0OGIwNzgyMmVjYzBmNTE0IiwidXNlcm5hbWUiOiJrZXZpbmVhdG9uNjAzIiwicGFzc3dvcmQiOiIkMmEkMTAkdzQ0NGY1bzFQM1FhRk5kckZ6OUYvT2NZV01ZclY2aGZCb29TR1dpdTAzV1dhMk9tSC9qVy4iLCJfX3YiOjAsImlhdCI6MTU4NDU2MTA2OX0.1i4faNerWFM29uODLK_HQP-thU4OSXC0vetiF6Y1oOs'])
      .end((error, res) => {
        expect(error).toBe(null);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('{"email":["gov.eaton@gmail.com"],"spotify":null,"event":null,"pastEvents":[],"followers":[],"following":[],"profile":null,"_id":"5e7277cf48b07822ecc0f514","username":"kevineaton603","password":"$2a$10$w444f5o1P3QaFNdrFz9F/OcYWMYrV6hfBooSGWiu03WWa2OmH/jW.","__v":0,"iat":1584561069}');
        done();
      });
  }));

  /* it('Should Create a New User', async (done) => {
    const test = await request(app);
    const res = await test
      .post('/api/user')
      .send({
        name: 'kevineaton',
        password: 'password123',
        confirmPassword: 'password123',
        email: 'kevin.eaton@mymail.champlain.edu',
      })
      .set('Accept', 'application/json');
    // console.log(res);
    expect(res.statusCode).toBe(200);
    // user = res.body;
    done();
  });

  it('Should login user and create cookie', () => new Promise((done) => {
    request(app)
      .post('/api/user/login')
      .send({
        name: 'user',
        password: 'password',
      })
      .type('form')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res);
        expect(err).toBe(null);
        expect(res.statusCode).toBe(200);
        expect(res.cookie).toHaveProperty('token');
        userToken = res.cookie.token;
        done();
      });
  }));

  it('Delete a current user by id', () => new Promise((done) => {
    request(app)
      .delete('/api/user')
      .set({
        username: 'user',
        password: 'password',
      })
      .end((error, res) => {
        expect(error).toBe(null);
        expect(res.statusCode).toBe(200);
        done();
      });
  })); */
});
