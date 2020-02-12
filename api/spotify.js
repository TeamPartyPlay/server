/* eslint-disable no-underscore-dangle */
const express = require('express');
// const SpotifyModel = require('../models/Spotify');
const UserModel = require('../models/User');
const { clientId, clientSecret } = require('../config');
const tokenAuth = require('./../middleware/tokenAuth');

const router = express.Router();

// Get Spotify access, refresh, expiration
router.get('/', tokenAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const spotify = await user.populate('spotify');
    console.log(spotify);
    res.status(200).send({ spotify });
  } catch (error) {
    res.status(500).send({ error });
  }
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
