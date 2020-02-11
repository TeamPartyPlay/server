const express = require('express');
// const SpotifyModel = require('../models/Spotify');
const { clientId, clientSecret } = require('../config');

const router = express.Router();

router.get('/secret', (req, res) => {
  res.send({ clientId, clientSecret });
});

module.exports = router;
