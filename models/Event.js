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
  invites: [{ type: ObjectId, ref: 'Invite', required: true }],
  tags: [{ type: String }],
});

const EventModel = model(
  'Event',
  EventSchema,
);

module.exports = EventModel;
