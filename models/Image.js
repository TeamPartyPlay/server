const { model } = require('mongoose');
const BaseSchema = require('./BaseSchema');

const ImageSchema = BaseSchema();

ImageSchema.add({
  mimetype: String,
  data: Buffer,
});

const ImageModel = model(
  'Image',
  ImageSchema,
);

module.exports = ImageModel;
