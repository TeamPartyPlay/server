const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;

const TrackSchema = BaseSchema();

TrackSchema.add({
  uri: { type: String, required: true },
  votes: [{ type: ObjectId, ref: 'User' }],
});

const TrackModel = model(
  'Track',
  TrackSchema,
);

module.exports = TrackModel;
