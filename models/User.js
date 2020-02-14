const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;
const UserSchema = BaseSchema();

UserSchema.add({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: [{ type: String, required: true }],
  spotify: { type: ObjectId, ref: 'Spotify', default: null },
  event: { type: ObjectId, ref: 'Event', default: null },
  pastEvents: [{ type: ObjectId, ref: 'Event', default: null }],
  followers: [{ type: ObjectId, ref: 'User', default: null }],
  following: [{ type: ObjectId, ref: 'User', default: null }],
  profile: { type: ObjectId, ref: 'Image', default: null },
});

const UserModel = model(
  'User',
  UserSchema,
);

module.exports = UserModel;
