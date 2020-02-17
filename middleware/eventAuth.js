const jwt = require('jsonwebtoken');
const EventModel = require('./../models/Event');

const eventAuth = (req, res, next) => {
  const { event } = req.body;
  req.event = null;
  if (event) {
    EventModel.findById(event, (error, doc) => {
      if (error) res.status(401).send({ error: 'Event Authorization Error' });
      else {

      }
    });
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
