const { Schema, model } = require('mongoose');

const { Decimal128 } = Schema.Types;

const LocationModel = new model(
  'Location',
  new Schema({
    lat: { type: Decimal128, required: true },
    lng: { type: Decimal128, required: true },

  }),
);

module.exports = LocationModel;
