const { Schema, model } = require('mongoose');

const { ObjectId } = Schema;

const InviteModel = new model(
  'Invite',
  new Schema({
    user: { type: ObjectId, ref: 'User', required: true },
    status: { type: Number, required: true },
  }),
);

module.exports = InviteModel;
