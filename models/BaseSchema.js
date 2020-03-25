const { Schema } = require('mongoose');

const BaseSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

BaseSchema.pre(/^update|save/, (next) => {
  this.updatedAt = Date.now();
  next();
});

module.exports = () => BaseSchema.clone();
