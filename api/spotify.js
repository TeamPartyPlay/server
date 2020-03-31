/* eslint-disable no-underscore-dangle */
const express = require('express');
const UserModel = require('models/User');
const SpotifyModel = require('models/Spotify');
const tokenAuth = require('middleware/tokenAuth');

const { clientId, clientSecret } = process.env;


const router = express.Router();

router.use(tokenAuth);

// Get Spotify access, refresh, expiration
router.get('/', async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate('spotify');
    const { spotify } = user;
    if (!user) throw Error("User Doesn't Exist");
    if (!user.spotify) throw Error('User is not logged into Spotify');
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

router.post('/', async (req, res) => {
  try {
    const { accessToken, refreshToken, expires } = req.body;
    const { user } = req;

    const spotify = new SpotifyModel({
      accessToken,
      refreshToken,
      expires,
    });

    await spotify.save();

    user.spotify = spotify;

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

module.exports = router;
