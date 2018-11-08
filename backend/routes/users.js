'use strict';

var mongoose = require('mongoose');
var User = require('mongoose').model('User');
var Event = require('mongoose').model('Event');

exports.plugin = {
    name: 'routes-users',
    version: '1.0.0',
    register: async function(server, options) {

        // Routes
        // ------------------
        // GET
        server.route({
            method: 'GET',
            path: '/users',
            handler: async function (request,h)
            {
                // TODO: Validate Query
                return User.find().limit(15).exec();
            }
        });


        // Routes
        // ------------------
        // PUT
        server.route({
            method: 'PUT',
            path: '/users',
            handler: async function (request,h)
            {
                // TODO: Validate
                var payload = request.payload;


                try {
                    // if !validate(payload) return h.response('Nice Try fam..').code(400);
                    const user = new User(payload);
                    user.save();
                    return h
                        .response(user)
                        .code(201);
                }
                catch (err) {
                    console.error(err);
                    return h.response("Unable to create user").code(400);
                }
            }
        });


        // Routes
        // ------------------
        // POST
        server.route({
            method: 'POST',
            path: '/users/{id}',
            handler: async function (request,h)
            {
                // TODO: Validate
                var payload = request.payload;

                // if !validate(payload) return h.response('Nice Try fam..').code(400);
                if (request.params.id) {
                    return h
                        .response(`No ID submitted.`)
                        .code(401);
                }

                var user = User.findByIdAndUpdate(
                    encodeURIComponent(request.params.id), 
                    payload,
                    (err) => {
                        if (err) return h.response(err).code(400);
                    });

                return h
                    .response(user)
                    .code(201);
            }
        });

        // Routes
        // ------------------
        // DELETE
        server.route({
            method: 'DELETE',
            path: '/users',
            handler: async function (request,h)
            {
                var params = request.params;

                // TODO: Remove a user from the DB. Err if user DNE.
                return User.deleteOne({ _id: params.id}, function (err) {
                    if (err) return h.response(err).code(400);
                })
            }
        });
    }
};
