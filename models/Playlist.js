const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;

const PlaylistSchema = BaseSchema();

PlaylistSchema.add({
  spotifyId: { type: String, required: true },
  tracks: [{ type: ObjectId, ref: 'Track', default: [] }],
});

const PlaylistModel = model(
  'Playlist',
  PlaylistSchema,
);

module.exports = PlaylistModel;
