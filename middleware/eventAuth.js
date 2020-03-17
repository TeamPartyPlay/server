const jwt = require('jsonwebtoken');
const EventModel = require('./../models/Event');

const eventAuth = async (req, res, next) => {
  const { eventId } = req.body;
  req.event = null;
  try {
    if (eventId) {
      const event = await EventModel.findById(eventId);
    }
  } catch (error) {
    res.status(401).send({ error: 'Event Authorization Error' });
  }

  if (req.cookies.token) {
    jwt.verify(req.cookies.token, 'secret', (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        res.status(401).send({ error: 'Event Authorization Error' });
      }
    });
  } else {
    res.status(401).send({ error: 'Event Authorization Error' });
  }
};

module.exports = eventAuth;
