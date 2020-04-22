const { Schema, model } = require('mongoose');
const PlaylistModel = require('./Playlist');
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
  isPublic: { type: Boolean, required: true },
  invites: [{ type: ObjectId, ref: 'Invite', default: null }],
  attendees: [{ type: ObjectId, ref: 'User', default: null }],
  tags: [{ type: String, default: null }],
  playlist: { type: ObjectId, ref: 'Playlist', default: null },
  image: { type: ObjectId, ref: 'Image', default: null },
});

EventSchema.post(/^delete|remove/, (doc) => {
  PlaylistModel.findByIdAndDelete(doc.playlist);
});

const EventModel = model(
  'Event',
  EventSchema,
);

module.exports = EventModel;
