const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const EventModel = new model(
  'Event',
  new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: ObjectId, ref: 'User', required: true },
    location: { type: ObjectId, ref: 'Location', required: true },
    start: { type: Date, required: true },
    end: { type: Date },
    public: { type: Boolean, required: true },
    invites: [{ type: ObjectId, ref: 'Invite', required: true }],
    tags: [{ type: String }],
  }),
);

module.exports = EventModel;
