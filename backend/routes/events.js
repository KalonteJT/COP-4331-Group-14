'use strict';

var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var Event = require('mongoose').model('Event');

exports.plugin =
    {
        name: 'routes-events',
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
                        var events;
                        if (query.lon && query.lat && query.dist) {
                           events = Event.findNearby([query.lon, query.lat], query.dist * 1609.34);
                        }
                        else {
                           events = Event.find().limit(15).exec();
                        }
                    }
                    catch (err) {
                        console.log(err);
                        return h.response('Malformed request could not be processed').code(400);
                    }
                    return h.response(events).code(200);
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
            // PUT
            server.route({
                method: 'PUT',
                path: '/events',
                handler: async function (request,h)
                {
                    var payload = request.payload;

                    // if !validate(payload) return h.response('Nice Try fam..').code(400);

                    var event = new Event({
                        name: payload.name,
                        desc: payload.desc,
                        time: {
                            start: payload.start, 
                            end: payload.end
                        },
                        loc: payload.loc,
                        host: payload.host,
                        members: payload.members,
                        capacity: payload.capacity
                    });

                    console.log(event);

                    try {
                        var response =  event.save(err => { 
                            if (err) return err;
                        });
                        return h.
                            response(`Successfully Created ${encodeURIComponent(request.params.name)}`)
                            .code(201);
                    } 
                    catch(error) { 
                        console.error(error);
                        return h.response('Request could not be processed').code(400);
                    }
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
