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

router.post('/', async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const event = await EventModel.findById(eventId);
    const invite = new InviteModel({ user: userId });
    event.invites = [...event.invites, invite];
    event.save();
    invite.save();
    res.send({ invite });
  } catch (error) {
    res.status(500).send({ error });
  }
});

/**
 * Handles Invite Status Updates
 * @param {number} status Invite Status
 */
const inviteClosure = (status) => {
  /**
   * Handles Invite Status Updates
   * @param {Express.Request} req Express Request
   * @param {Express.Response} res Express Response
   */
  const inviteHandler = async (req, res) => {
    const { id } = req.body;
    const invite = await InviteModel.findById(id);
    invite.status = status;
    await invite.save();
    res.send({ invite });
  };
  return inviteHandler;
};

// Accept Invite
router.post('/accept', inviteClosure(2));

// Decline Invite
router.post('/decline', inviteClosure(3));

// User has seen invite but has not interacted with it
router.post('/seen', inviteClosure(1));

router.delete('/:id', async (req, res) => {
  await InviteModel.findByIdAndDelete(req.params.id);
  res.send({ response: 'success' });
});

module.exports = router;
