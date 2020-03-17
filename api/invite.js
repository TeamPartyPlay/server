const express = require('express');
const tokenAuth = require('../middleware/tokenAuth');
const { InviteModel, EventModel } = require('../models');


const router = express.Router();

router.use(tokenAuth);

/**
 * Invite Status
 * 0: Not Seen
 * 1: Seen
 * 2: Accept
 * 3. Decline
 */

// Get Current Status of the Invite
router.get('/', (req, res) => {
  res.send({ connection: true });
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const invites = await InviteModel.find({ user: id });
    res.send({ invites });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

router.get('/event/:id', async (req, res) => {
  const { id } = req.params;
  const invites = await EventModel
    .findById(id)
    .populate('invites');
  res.send({ invites });
});

// Accept Invite
router.post('/accept', async (req, res) => {
  const { id } = req.body;
  const invite = await InviteModel.findById(id);
  invite.status = 2;
  await invite.save();
  res.send({ invite });
});

// Decline Invite
router.post('/decline', async (req, res) => {
  const { id } = req.body;
  const invite = await InviteModel.findById(id);
  invite.status = 3;
  await invite.save();
  res.send({ invite });
});

// User has seen invite but has not interacted with it
router.post('/seen', async (req, res) => {
  const { id } = req.body;
  const invite = await InviteModel.findById(id);
  invite.status = 1;
  await invite.save();
  res.send({ invite });
});


router.delete('/:id', async (req, res) => {
  await InviteModel.findByIdAndDelete(req.params.id);
  res.send({ response: 'success' });
});

module.exports = router;
