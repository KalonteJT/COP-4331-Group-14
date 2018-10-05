'use strict';

var mongoose = require('mongoose');

exports.plugin =
    {
        name: 'routes-default',
        version: '1.0.0',
        register: async function(server, options, next) {

            // Routes
            // ------------------
            // GET
            server.route({
                method: ['GET','POST','PUT','PATCH','DELETE'],
                path: '/',
                handler: async (request,h) =>
                {
                    return h.response('Please issue another request on a valid endpoint').code(204);
                }
            });
        }
    };
