/* eslint-disable no-underscore-dangle */
const express = require('express');
// const SpotifyModel = require('../models/Spotify');
const UserModel = require('../models/User');

const { clientId, clientSecret } = process.env;
const tokenAuth = require('../middleware/tokenAuth');

const router = express.Router();

// Get Spotify access, refresh, expiration
router.get('/', tokenAuth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate('spotify');
    const { spotify } = user;
    if (!user) throw Error("User Doesn't Exist");
    if (!user.spotify) throw Error('User is not logged in Spotify');
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
