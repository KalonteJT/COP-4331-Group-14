'use strict';

var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var Event = require('mongoose').model('Event');


async function validate (payload) {
    // TODO: Validate an update payload
    // Likely using JOI
    return false;
}

exports.plugin = {

    name: 'routes-events',
    version: '1.0.1',
    register: async function(server, options, next) {

        // Routes
        // ------------------
        // GET
        server.route({
            method: 'GET',
            path: '/events',
            handler: async (request,h) =>
            {
                // TODO: Validate Query
                var query = request.query;

                // Query based on distance
                try {
                    if (query.lon && query.lat && query.dist) {
                        return Event.findNearby([query.lon, query.lat], query.dist * 1609.34);
                    }
                    else {
                        return Event.find().limit(15).exec();
                    }
                }
                catch (err) {
                    console.log(err);
                    return h.response('Malformed request could not be processed').code(400);
                }

            }
        });


        server.route({
            method: 'GET',
            path: '/events/{id}',
            handler: async function (request,h)
            {
                // TODO: Validate Query
                return Event.find({ _id: request.query.id}).exec();
            }
        });


        // Routes
        // ------------------
        // POST
        server.route({
            method: 'POST',
            path: '/events/{id}',
            handler: async function (request,h)
            {
                // TODO: Validate
                var payload = request.payload;

                // if !validate(payload) return h.response('Nice Try fam..').code(400);

                var event = Event.findByIdAndUpdate(
                    encodeURIComponent(request.params.id), 
                    payload, 
                    (err) => {
                        if (err) return h.response(err).code(400);
                    });

                return h
                    .response(`Successfully Updated event: ${encodeURIComponent(event.name)}`)
                    .code(201);
            }
        });


        // Routes
        // ------------------
        // DELETE
        server.route({
            method: 'DELETE',
            path: '/events/{id}',
            handler: async function (request,h)
            {
                var payload = request.payload;

                // if !validate(payload) return h.response('Nice Try fam..').code(400);

                var event = Event.findByIdAndDelete(
                    encodeURIComponent(request.params.id), 
                    payload, 
                    (err) => {
                        if (err) return h.response(err).code(400);
                    });

                return h
                    .response(`Successfully removed event: ${encodeURIComponent(event.name)}`)
                    .code(203);
            }   
        });
    }
};
