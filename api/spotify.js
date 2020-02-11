/* eslint-disable no-underscore-dangle */
const express = require('express');
// const SpotifyModel = require('../models/Spotify');
const UserModel = require('../models/User');
const { clientId, clientSecret } = require('../config');
const TokenAuth = require('./../middleware/tokenAuth');

const router = express.Router();

// Get Spotify access, refresh, expiration
router.get('/', TokenAuth, async (req, res) => {
  UserModel
    .findById(req.user._id)
    .populate('spotify')
    .exec((err, user) => {
      if (err) res.send({ error: `User: ${req.user.username} cannot be found` });
      else {
        res.send({ valid: true });
      }
    });
});

// Use accesses Client Secret and Client ID
router.get('/secret', (req, res) => {
  res.send({ clientId, clientSecret });
});

// TODO: Stream Playback to Device
router.get('/stream/:eventId', (req, res) => {
  res.send({ clientId, clientSecret });
});

module.exports = router;
