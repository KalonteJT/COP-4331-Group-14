var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defines the basic uUser Schema as stored in the DB
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

pointSchema.index({ location: '2dsphere' });

exports.pointSchema = pointSchema;
