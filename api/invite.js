const express = require('express');
const tokenAuth = require('../middleware/tokenAuth');
const { InviteModel, EventModel } = require('../models');


const router = express.Router();

router.use(tokenAuth);

const inviteStatus = {
  NOT_SEEN: 0,
  SEEN: 1,
  ACCEPT: 2,
  DECLINE: 3,
};

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
    await event.save();
    await invite.save();
    res.send({ invite });
  } catch (error) {
    res.status(500).send({ error });
  }
});

/**
 * Handles Invite Status Updates
 * @param {number} status Invite Status
 */
const inviteHandler = (status) => {
  /**
   * Handles Invite Status Updates
   * @param {Express.Request} req Express Request
   * @param {Express.Response} res Express Response
   */
  const inviteClosure = async (req, res) => {
    const { id } = req.body;
    try {
      const invite = await InviteModel.findById(id);
      invite.status = status;
      await invite.save();
      return res.send({ invite });
    } catch (error) {
      return res.status(500).send({ error });
    }
  };
  return inviteClosure;
};

// Accept Invite
router.post('/accept', inviteHandler(inviteStatus.ACCEPT));

// Decline Invite
router.post('/decline', inviteHandler(inviteStatus.DECLINE));

// User has seen invite but has not interacted with it
router.post('/seen', inviteHandler(inviteStatus.SEEN));

router.delete('/:id', async (req, res) => {
  await InviteModel.findByIdAndDelete(req.params.id);
  res.send({ response: 'success' });
});

module.exports = router;
