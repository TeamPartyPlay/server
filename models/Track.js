const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const TrackModel = model(
  'Track',
  new Schema({
    uri: { type: String, required: true },
    votes: [{ type: ObjectId, ref: 'User' }],
  }),
);

module.exports = TrackModel;
