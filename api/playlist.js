const express = require('express');
const tokenAuth = require('../middleware/tokenAuth');

const router = express.Router();

router.use(tokenAuth);

/**
 * Get Playlist by Current Event
 */
router.get('/', /** TODO: Event Authorization */ (req, res) => {
  res.send({ connection: 'success' });
});

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  res.send({ connection: 'success' });
});

router.post('/vote', (req, res) => {
  const { event, playlist, song } = req.body;
  res.send({ connection: 'success' });
});

module.exports = router;
