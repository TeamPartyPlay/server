const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ connection: true });
});

router.post('/accept', (req, res) => {
  res.send({ connection: true });
});

router.post('/decline', (req, res) => {
  res.send({ connection: true });
});

router.post('/seen', (req, res) => {
  res.send({ connection: true });
});

module.exports = router;
