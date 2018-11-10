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

                const query = request.query;
                console.log(query);

                if (query.id) {
                    return User
                        .findOne({ '_id': encodeURIComponent(query.id)}).exec();
                } else if (query.email) {
                    return User
                        .findOne({ email: query.email}).exec();
                } else {
                    return h
                        .response('insufficient params')
                        .code(400)
                }
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
            path: '/users',
            handler: async function (request,h)
            {
                // TODO: Validate
                const query = request.query;
                var payload = request.payload;

                // if !validate(payload) return h.response('Nice Try fam..').code(400);
                if (query.id) {
                    return User.findByIdAndUpdate(
                        encodeURIComponent(query.id), 
                        payload,
                        (err) => {
                            if (err) return h.response(err).code(400);
                        });
                } else if (query.email) {

                    return User.findOneAndUpdate(
                        { email: query.email}, 
                        payload,
                        (err) => {
                            if (err) return h.response(err).code(400);
                        });
                }
                else {
                    return h
                        .response(`No ID submitted.`)
                        .code(401);
                }
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
                var query = request.query;
                if (query.id) {
                    // TODO: Remove a user from the DB. Err if user DNE.
                    return User.deleteOne({ '_id': query.id}, function (err) {
                        if (err) return h.response(err).code(400);
                    });
                } else if (query.email) {
                    // TODO: Remove a user from the DB. Err if user DNE.
                    return User.deleteOne({ 'email': query.email}, function (err) {
                        if (err) return h.response(err).code(400);
                    });
                }
                else {
                    return h
                        .response(`No ID submitted.`)
                        .code(401);
                }

            }
        });
    }
};
