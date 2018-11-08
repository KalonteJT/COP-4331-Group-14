'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Events = require('./event.js');
// var bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;


// Defines the basic User Schema as stored in the DB
var UserSchema = new Schema({
   name: {
      first: {type: String },
      last: {type: String }
   },
   email: {
      type: String, 
      required: true, 
      unique: true,
      index: true
   },
   status: String,
   events: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
   }],
   friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }]
}, {timestamps: true});
//UserSchema.pre('save', function(next) {
//    var user = this;
//
//    // only hash the password if it has been modified (or is new)
//    if (!user.isModified('password')) return next();
//
//    // generate a salt
//    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//        if (err) return next(err);
//
//        // hash the password using our new salt
//        bcrypt.hash(user.password, salt, function(err, hash) {
//            if (err) return next(err);
//
//            // override the cleartext password with the hashed one
//            user.password = hash;
//            next();
//        });
//    });
//});
//
//UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//        if (err) return cb(err);
//        cb(null, isMatch);
//    });
//};

// Instantiate the User Model
// Note, Mongoose automatically looks for the plural form of a model name, hence
// it will look for the "Users" collection in the QupDB
var User = mongoose.model('User', UserSchema);

module.exports = User;
