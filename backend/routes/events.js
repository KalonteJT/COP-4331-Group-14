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
            path: '/events/near',
            handler: async (request,h) =>
            {
                // TODO: Validate Query
                var query = request.query;

                // Query based on distance
                try {
                    if (query.lon && query.lat) {

                        if (query.dist === null) {
                            query.dist = 5;
                        }
                        else if (query.dist < 5) {
                            query.dist = 5;
                        }
                        else if (query.dist > 50) {
                            query.dist = 50;
                        }

                        return Event
                            .findNearby([query.lon, query.lat], query.dist * 1609.34);
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
            path: '/events',
            handler: async function (request,h)
            {
                var query = request.query;
                if (query.id !== null) {

                // todo: validate query
                return Event
                    .find({ '_id': encodeURIComponent(request.query.id)})
                    .populate({path: 'members', select: '_id name email time date eventString'})
                    .exec();
                }
                else if (query.owner !== null) {
                 // todo: validate query
                return Event
                    .find({ 'owner': encodeURIComponent(query.owner)})
                    .populate({path: 'members', select: '_id name email time date eventString'})
                    .exec();

                }
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
                // TODO: Validate
                var payload = request.payload;

                // if !validate(payload) return h.response('Nice Try fam..').code(400);

                try {
                    const nevent = new Event(payload);

                    if (nevent.loc.coordinates === null) {
                        return h.response('no coordinates fam').code(400);
                    }
                    
                    if (nevent.loc.type === null) {
                        nevent.loc.type = "Point";
                    }
                    
                    nevent.save();
                    return h.response(nevent).code(200);
                } 
                catch (err) {
                    console.log(err);
                    return h.response('Malformed request could not be processed').code(400);
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

                const event = Event.findOneAndUpdate(
                    { _id: encodeURIComponent(request.params.id)},
                    payload,
                    (err, doc) => {
                        if (err) return h.response(err).code(400);

                        return doc;
                    }); 

                return h.response(event).code(200); 
            }
        });

        // Routes
        // ------------------
        // PUT / POST (join event)
        server.route({
            method: ['POST', 'PUT'],
            path: '/events/{id}/join',
            handler: async function (request,h)
            {
                // TODO: Validate
                // if !validate(payload) return h.response('Nice Try fam..').code(400);

                var query = request.query;

                if (!query.user) 
                {
                    return h
                        .response(`Unable to join event: ${encodeURIComponent(request.params.id)}`)
                        .code(401);
                }

                const event = Event.findOneAndUpdate(
                    { _id: encodeURIComponent(request.params.id) },
                    {$push: {members: query.user}},
                    {new: true},
                    (err, doc) => {
                        if (err) return h.response(err).code(400);

                        return doc;
                    });

                return h
                    .response(event)
                    .code(201);
            }
        });

        // Routes
        // ------------------
        // PUT / POST ( event)
        server.route({
            method: ['POST', 'PUT'],
            path: '/events/{id}/leave',
            handler: async function (request,h)
            {
                // TODO: Validate
                // if !validate(payload) return h.response('Nice Try fam..').code(400);

                var query = request.query;

                if (!query.user) 
                {
                    return h
                        .response(`Unable to leave event: ${encodeURIComponent(request.params.id)}`)
                        .code(401);
                }

                const event = Event.findOneAndUpdate(
                    { _id: encodeURIComponent(request.params.id) },
                    {$pull: {members: query.user}},
                    {new: true},
                    (err, doc) => {
                        if (err) return h.response(err).code(400);

                        return doc;
                    }); 

                return h
                    .response(event)
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

                const event = Event.deleteOne(
                    { _id: encodeURIComponent(request.params.id) } , 
                    payload, 
                    (err) => {
                        if (err) return h.response(err).code(400);
                    });

                return h
                    .response(true)
                    .code(203);
            }   
        });
    }
};
