const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { ObjectId } = Schema;

const InviteSchema = BaseSchema();

InviteSchema.add({
  user: { type: ObjectId, ref: 'User', required: true },
  status: { type: Number, required: true },
  sent: { type: Boolean, required: true },
});

const InviteModel = model(
  'Invite',
  InviteSchema,
);

module.exports = InviteModel;
