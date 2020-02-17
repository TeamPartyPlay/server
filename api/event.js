const express = require('express');
const tokenAuth = require('./../middleware/tokenAuth');

const router = express.Router();

router.use(tokenAuth);

// Get All Event Information
router.get('/', (req, res) => {
  res.send({ connection: 'success' });
});

// Post New Event
router.post('/', (req, res) => {
  res.send({ connection: 'success' });
});

// Update Event
router.put('/', (req, res) => {
  res.send({ connection: 'success' });
});

// Join Event
router.post('/:eventId', (req, res) => {
  res.send({ connection: 'success' });
});

router.get('/:eventId', (req, res) => {
  const { eventId } = req.params;
  console.log(eventId);
  res.send({ connection: 'success' });
});


module.exports = router;
