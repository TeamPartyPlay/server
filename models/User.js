const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const UserModel = model(
  'User',
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: [{ type: String, required: true }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    spotify: { type: ObjectId, ref: 'Spotify' },
  }),
);

module.exports = UserModel;
