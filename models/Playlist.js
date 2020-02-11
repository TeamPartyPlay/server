const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const PlaylistModel = model(
  'Playlist',
  new Schema({
    spotifyId: { type: String, required: true },
    tracks: [{ type: ObjectId, ref: 'Track' }],
  }),
);

module.exports = PlaylistModel;
