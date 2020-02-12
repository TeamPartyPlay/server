const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const SpotifyModel = new model(
  'Spotify',
  new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: Number, required: true },
    expires: { type: Date, required: true },
  }),
);

module.exports = SpotifyModel;
