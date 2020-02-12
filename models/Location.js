const { Schema, model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const { Decimal128 } = Schema.Types;

const LocationSchema = BaseSchema();

LocationSchema.add({
  lat: { type: Decimal128, required: true },
  lng: { type: Decimal128, required: true },
});

const LocationModel = model(
  'Location',
  LocationSchema,
);

module.exports = LocationModel;
