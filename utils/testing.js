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

/**
 * Creates a Dummy Event for Testing Purposes
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} token Tokenized Test User
 * @param {string} name Test Event Name
 * @param {string} description Test Event Name
 * @param {string} owner ObjectId of Test User Object
 * @param {number} lat Latitude of Location
 * @param {number} lng Longitude of Location
 * @param {Date} start Start Time
 * @param {Boolean} isPublic If the event is public
 * @param {Object} eventCreationOpts Other event options
 */
const createTestEvent = async (
  request,
  app,
  token,
  name,
  description,
  owner,
  lat,
  lng,
  start,
  isPublic,
  eventCreationOpts,
) => {
  const req = await request(app);
  const res = await req
    .post('/api/event')
    .set('Cookie', [token])
    .send({
      name,
      description,
      owner,
      lat,
      lng,
      start,
      isPublic,
      ...eventCreationOpts,
    });
  return res.body;
};

/**
 * Allows Test User to Join Test Event
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} token Tokenized Test User
 * @param {string} id ObjectId of Test Event
 */
const joinTestEvent = async (request, app, token, id) => {
  const req = await request(app);
  const res = await req
    .post(`/api/event/join/${id}`)
    .set('Cookie', [token]);
  let [eventToken] = res.header['set-cookie'];
  [eventToken] = eventToken.split(';');

  return eventToken;
};

/**
 * Deletes a Dummy User for testing purposes
 * @param {supertest} request SuperTest Request
 * @param {Express.Application} app Express App
 * @param {string} token Tokenized Test User
 * @param {string} id ObjectId of Test Event
 */
const deleteTestEvent = async (request, app, token, id) => {
  const req = await request(app);
  const res = await req
    .delete(`/api/event/${id}`)
    .set('Cookie', [token]);
};

module.exports = {
  createTestUser,
  loginTestUser,
  deleteTestUser,
  createTestEvent,
  joinTestEvent,
  deleteTestEvent,
};
