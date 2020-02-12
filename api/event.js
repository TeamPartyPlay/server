const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ connection: 'success' });
});

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  console.log(eventId);
  res.send({ connection: 'success' });
});

module.exports = router;
