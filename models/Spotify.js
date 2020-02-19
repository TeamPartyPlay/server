const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;

const SpotifySchema = BaseSchema();

SpotifySchema.add({
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expires: { type: Date, required: true },
});

const SpotifyModel = model(
  'Spotify',
  SpotifySchema,
);

module.exports = SpotifyModel;
