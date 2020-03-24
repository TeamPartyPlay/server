const express = require('express');
const supertest = require('supertest');

/**
 * Create a Dummy User for testing purposes
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} username Test Username
 * @param {string} password Test Password
 * @param {string} email Test Email
 */
const createTestUser = async (request, app, username, password, email) => {
  const req = await request(app);
  const res = await req
    .post('/api/user')
    .send({
      username,
      password,
      confirmPassword: password,
      email,
    })
    .set('Accept', 'application/json');
  const user = res.body;
  return user;
};

/**
 * Logins a Dummy User for testing purposes
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} username Test Username
 * @param {string} password Test Password
 */
const loginTestUser = async (request, app, username, password) => {
  const req = await request(app);
  const res = await req
    .post('/api/user/login')
    .send({
      username,
      password,
    })
    .set('Accept', 'application/json');
  let [createdUserToken] = res.header['set-cookie'];
  [createdUserToken] = createdUserToken.split(';');

  return createdUserToken;
};

/**
 * Deletes a Dummy User for testing purposes
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} id ObjectId of Test User Object
 * @param {string} token Tokenized Test User
 */
const deleteTestUser = async (request, app, id, token) => {
  const req = await request(app);
  const res = await req
    .delete('/api/user')
    .set('Cookie', [token])
    .send({ id });
};

module.exports = {
  createTestUser,
  loginTestUser,
  deleteTestUser,
};
