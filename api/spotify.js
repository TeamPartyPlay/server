const express = require('express');
// const SpotifyModel = require('../models/Spotify');
const UserModel = require('../models/User');
const { clientId, clientSecret } = require('../config');

const router = express.Router();

// Get Spotify access, refresh, expiration
router.get('/', async (req, res) => {
  UserModel.find({}, (err, users) => {
    res.send({ users });
  });
});

// Use accesses Client Secret and Client ID
router.get('/secret', (req, res) => {
  res.send({ clientId, clientSecret });
});

// Stream Playback to Device
router.get('/stream/:eventId', (req, res) => {
  res.send({ clientId, clientSecret });
});

module.exports = router;
