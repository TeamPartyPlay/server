const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: [{ type: String, required: true }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
  spotify: { type: ObjectId, ref: 'Spotify' },
});

const UserModel = model(
  'User',
  UserSchema,
);

UserSchema.pre('save', (next) => {
  if (this.createdAt) { this.update = Date.now(); }
  this.updatedAt = Date.now();
  next();
});


module.exports = UserModel;
