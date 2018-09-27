'use strict';

var mongoose = require('mongoose');
var Events = require('./event.js').Event;
var Schema = mongoose.Schema;

// Defines the basic User Schema as stored in the DB
var UserSchema = new Schema({
   name: {
      first: {type: String },
      last: {type: String }
   },
   email: {
      type: String, 
      required: true, 
      unique: true
   },
   username: { 
      type: String, 
      required: true, 
      unique: true 
   },
   password: { 
      type: String, 
      required: true 
   },
   created: {
      type: Date,
      default: Date.now
   },
   status: String,
   updated: Date,
   events: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
   }],
   friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }]
});

// Instantiate the User Model
// Note, Mongoose automatically looks for the plural form of a model name, hence
// it will look for the "Users" collection in the QupDB
var User = mongoose.model('User', UserSchema);

module.exports = User;
