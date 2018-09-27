'use strict';

var Event = require('../models/event.js').Event;
var User = require('../models/user.js').User;

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
            // TODO: Retrieve default users page... Bigger discussion? Login?
            return "PSSSST Pretend I'm a list of users :3"; 
         }
      });

      server.route({
         method: 'GET',
         path: '/users/{user}',
         handler: async function (request,h)
         {
            //TODO: Retrieve user from DB
            return "GET {user}: " + (encodeURIComponent(request.params.user));
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
            // TODO: Place user in DB if it does not exist. Err. Otherwise (username taken)
            return "PUT {user}: " + encodeURIComponent(request.payload.user);
         }
      });


      // Routes
      // ------------------
      // POST
      server.route({
         method: 'POST',
         path: '/users',
         handler:async function (request,h)
 
         {
            // TODO: Update a users info in the DB
            return "POST {user}: " + encodeURIComponent(request.payload.user);
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
            // TODO: Remove a user from the DB. Err if user DNE.
            return "Umm.... Delete what?";
         }
      });
   }
};
