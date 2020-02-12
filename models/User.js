const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;
const UserSchema = BaseSchema();

UserSchema.add({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: [{ type: String, required: true }],
  spotify: { type: ObjectId, ref: 'Spotify' },
  event: { type: ObjectId, ref: 'Event' },
  pastEvents: [{ type: ObjectId, ref: 'Event' }],
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }],
});

const UserModel = model(
  'User',
  UserSchema,
);

module.exports = UserModel;
