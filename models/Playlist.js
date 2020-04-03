const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');
const io = require('../socket');

const { ObjectId } = Schema;

const PlaylistSchema = BaseSchema();

PlaylistSchema.add({
  spotifyId: { type: String, required: true },
  tracks: [{ type: ObjectId, ref: 'Track', default: [] }],
});

PlaylistSchema.post(/^update|save/, (doc, next) => {
  io.emit('updatePlaylist');
  next();
});

const PlaylistModel = model(
  'Playlist',
  PlaylistSchema,
);

module.exports = PlaylistModel;
