const jwt = require('jsonwebtoken');
const express = require('express');
const EventModel = require('../models/Event');

/**
 * Used by some api endpoints to determine
 * if there is an event associated with the request
 * @param {express.Request} req Express Request
 * @param {express.Response} res Express Response
 * @param {express.NextFunction} next Express Next Function
 */
const eventAuth = async (req, res, next) => {
  const eventToken = req.cookies.eventToken || req.body.eventToken || req.query.eventToken;
  if (eventToken) {
    try {
      const { eventId } = await jwt.verify(eventToken, 'secret');
      const event = await EventModel
        .findById(eventId)
        .populate('playlist')
        .lean();
      req.event = event;
      next();
    } catch (error) {
      res.status(401).send({ error: 'Event Authorization Error' });
    }
  } else {
    res.status(401).send({ error: 'Event Authorization Error' });
  }
};

module.exports = eventAuth;
