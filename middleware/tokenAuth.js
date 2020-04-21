const jwt = require('jsonwebtoken');
const express = require('express');

/**
 * Used by some api endpoints to determine
 * if there is a user associated with the request
 * @param {express.Request} req Express Request
 * @param {express.Response} res Express Response
 * @param {express.NextFunction} next Express Next Function
 */
const tokenAuth = (req, res, next) => {
  req.user = null;
  const token = req.cookies.token || req.body.token || req.query.token;
  if (token) {
    jwt.verify(token, 'secret', (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ error: 'Invalid User Token' });
      }
    });
  } else {
    res.status(401).send({ error: 'No User Token' });
  }
};

module.exports = tokenAuth;
