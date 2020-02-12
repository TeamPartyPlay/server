const express = require('express');
const tokenAuth = require('./../middleware/tokenAuth');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ connection: 'success' });
});

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  res.send({ connection: 'success' });
});

router.post('/vote', tokenAuth, (req, res) => {
  res.send({ connection: 'success' });
});

module.exports = router;
