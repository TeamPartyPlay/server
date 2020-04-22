const express = require('express');
const jwt = require('jsonwebtoken');
const {
  EventModel, LocationModel, UserModel, ImageModel,
} = require('../models');
const tokenAuth = require('../middleware/tokenAuth');
const eventAuth = require('../middleware/eventAuth');

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
router.get('/', eventAuth, (req, res) => {
  const { event } = req;
  res.send(event);
});

router.get('/all', async (req, res) => {
  try {
    const events = await EventModel.find().populate('location').lean();
    return res.send(events);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get('/image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id) throw Error('Event not defined');
    const event = await EventModel.findById(id).populate('image').lean();
    if (!event) throw Error('Event not defined');
    else if (event.image) throw Error('Event Image not defined');
    else {
      res.contentType(event.image.mimetype);
      res.end(Buffer.from(event.image.data.buffer, 'base64'));
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

// Get event by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id).exec();
    return res.send(event);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// Create new event
router.post('/', async (req, res) => {
  const {
    name, description, lat, lng, start, end, isPublic, invites, attendees, tags,
  } = req.body;
  try {
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
    return res.send(event);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post('/image', async (req, res) => {
  // https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
  // https://medium.com/@alvenw/how-to-store-images-to-mongodb-with-node-js-fb3905c37e6d
  try {
    const id = req.body.eventId;
    const image = req.files.file;
    if (id && image) {
      const imageModel = new ImageModel();
      imageModel.data = image.data;
      imageModel.mimetype = image.mimetype;
      const imageRes = await imageModel.save();
      const event = await EventModel.findById(id);
      await ImageModel.deleteOne({ _id: event.image });
      event.image = imageModel._id;
      event.save();
    } else throw Error('Event or Image is not set');
  } catch (error) {
    res.status(500).send({ error });
  }
});

// User joins Event
router.post('/join/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const event = await EventModel.findById(id).exec();
    event.attendees = [...event.attendees, user._id];
    await event.save();
    const token = jwt.sign({ eventId: event._id }, 'secret');
    const properties = { httpOnly: true };
    res.cookie('eventToken', token, properties);
    return res.send(event);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// Get Event by Id
router.post('/exit/:id', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const event = await EventModel.findById(id).exec();
    const newAttendees = event.attendees.filter((i) => i !== user._id);
    event.attendees = newAttendees;
    await event.save();

    res.clearCookie('eventToken');

    return res.send(event);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// Update Event
router.put('/', eventAuth, async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const event = await EventModel.findById(id).exec();
  if (String(event.owner) === user._id) {
    await event.remove();
    return res.send({ delete: true });
  }
  return res.status(401).send('User Not Authorized');
});

module.exports = router;
