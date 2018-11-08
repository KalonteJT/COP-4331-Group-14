'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const pointSchema = require('./point').pointSchema;

// Defines the basic User Schema as stored in the DB
var EventSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    desc: { 
        type: String, 
        required: true
    },
    loc: {
        type: pointSchema,
        required: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
        //required: true
    },
    members: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        unique: true
    }],
    active: Boolean,
    capacity: Number
}, {timestamps: true});

EventSchema.index({ loc: '2dsphere' });

EventSchema.statics.findNearby = async function(coords, dist) {
    return this.find({
        loc: {
            $near: {
                $maxDistance: dist,
                $geometry: {
                    type: "Point",
                    coordinates: [coords[0], coords[1]]
                }
            }
        }
    });
};

EventSchema.statics.findAll = async function() {
    return Event.find({}).exec().then((event) => {
        console.log(event);
        return {events: event};
    }).catch((err) => {
        return err;
    });
}

// Instantiate the User Model
// Note, Mongoose automatically looks for the plural form of the model name when 
// determining the collection to add to: User ---> Users
var Event = mongoose.model('Event', EventSchema);

module.exports = Event;
