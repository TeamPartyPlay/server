const express = require('express');
const tokenAuth = require('./../../middleware/tokenAuth');

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
router.post('/:id', (req, res) => {
  res.send({ connection: 'success' });
});

// Get event information
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send({ connection: 'success' });
});


module.exports = router;
