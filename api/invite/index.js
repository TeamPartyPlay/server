const express = require('express');
const tokenAuth = require('./../../middleware/tokenAuth');

const router = express.Router();

router.use(tokenAuth);

// Get Current Status of the Invite
router.get('/', (req, res) => {
  res.send({ connection: true });
});

// Accept Invite
router.post('/accept', (req, res) => {
  const { eventId } = req.body;
  res.send({ connection: true });
});

// Decline Invite
router.post('/decline', (req, res) => {
  const { eventId } = req.body;
  res.send({ connection: true });
});

// User has seen invite but has not interacted with it
router.post('/seen', (req, res) => {
  const { eventId } = req.body;
  res.send({ connection: true });
});

module.exports = router;
