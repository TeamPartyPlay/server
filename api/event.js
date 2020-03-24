const express = require('express');
const tokenAuth = require('../middleware/tokenAuth');
const { EventModel, LocationModel } = require('../models');

const router = express.Router();

/**
 * |GET   | `/api/event` | Get current event by id | Event
 * |GET   | `/api/event/:id` | Get a event by id | Event
 * |POST  | `/api/event` | Create new event | Event
 * |POST  | `/api/event/join/:id` | User joins event | Event
 * |POST  | `/api/event/exit/:id` | User exits event | Event
 * |PUT   | `/api/event/`    | Update current event | Event
 * |PUT   | `/api/event/:id` | Update event by id | Event
 * |DELETE| `/api/event/:id` | Delete Event by id | Event
 */

router.use(tokenAuth);

// Get current event by id
router.get('/', /** TODO: Middleware Needed */ (req, res) => {
  const { event } = req;
  res.send({ event });
});

// Get event by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id).exec();
    res.send({ event });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// Create new event
router.post('/', async (req, res) => {
  const {
    name, description, lat, lng, start, end, isPublic, invites, attendees, tags,
  } = req.body;
  const owner = req.user._id;
  const location = new LocationModel({ lat, lng });
  await location.save();
  const event = new EventModel({
    name,
    description,
    owner,
    location,
    start,
    end,
    isPublic,
    invites,
    attendees,
    tags,
  });
  await event.save();
  res.send(event);
});

// User joins Event
router.post('/join/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const event = await EventModel.findById(id).exec();
  event.attendees = [...event.attendees, user._id];
  await event.save();
  res.send(event);
});

// Get Event by Id
router.post('/exit/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const event = await EventModel.findById(id).exec();
  const newAttendees = event.attendees.filter((i) => i !== user._id);
  event.attendees = newAttendees;
  await event.save();
  res.send(event);
});

// Update Event
router.put('/', /** TODO: Middleware Needed */ async (req, res) => {
  const {
    name, description, owner, location, start, end, isPublic, invites, attendees, tags,
  } = req.body;

  const { event, user } = req;

  if (event.owner === user._id) {
    res.send({ connection: 'success' });
  } else {
    res.status(401).send('User Not Authorized');
  }
});


// Update Event
router.put('/:id', async (req, res) => {
  const {
    name, description, owner, location, start, end, isPublic, invites, attendees, tags,
  } = req.body;
  const { user } = req;
  const { id } = req.params;
  const event = await EventModel.findById(id).exec();
  if (event.owner === user._id) {
    return res.send({ connection: 'success' });
  }
  return res.status(401).send('User Not Authorized');
});

// Delete Event
router.put('/:id', async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const event = await EventModel.findById(id).exec();
  if (event.owner === user._id) {
    return res.send({ connection: 'success' });
  }
  return res.status(401).send('User Not Authorized');
});

module.exports = router;
