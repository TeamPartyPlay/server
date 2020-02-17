const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;

const EventSchema = BaseSchema();

EventSchema.add({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: ObjectId, ref: 'User', required: true },
  location: { type: ObjectId, ref: 'Location', required: true },
  start: { type: Date, required: true },
  end: { type: Date },
  public: { type: Boolean, required: true },
  invites: [{ type: ObjectId, ref: 'Invite', default: null }],
  attendees: [{ type: ObjectId, ref: 'User', default: null }],
  tags: [{ type: String, default: null }],
});

const EventModel = model(
  'Event',
  EventSchema,
);

module.exports = EventModel;
