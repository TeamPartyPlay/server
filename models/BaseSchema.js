const { Schema } = require('mongoose');

const BaseSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

BaseSchema.pre(/^update|save/, (next) => {
  if (this.createdAt) { this.update = Date.now(); }
  this.updatedAt = Date.now();
  next();
});

module.exports = () => BaseSchema.clone();
