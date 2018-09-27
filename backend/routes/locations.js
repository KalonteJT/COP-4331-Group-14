'use strict';

exports.register = function(server, options, next) 
{
   const db = server.app.db;

   
   // Routes
   // ------------------
   // GET
   server.route({
      method: 'GET',
      path: '/locations',
      handler: async function (request,h)
      {

      }
   });

   server.route({
      method: 'GET',
      path: '/locations/{location}',
      handler: async function (request,h)
      {

      }
   });


   // Routes
   // ------------------
   // PUT
   server.route({
      method: 'PUT',
      path: '/locations/{location}',
      handler: async function (request,h)
      {

      }
   });


   // Routes
   // ------------------
   // POST
   server.route({
      method: 'POST',
      path: '/locations/{location}',
      handler: async function (request,h)
      {
      }
   });


   // Routes
   // ------------------
   // DELETE
   server.route({
      method: 'DELETE',
      path: '/locations/{location}',
      handler: async function (request,h)
      {
      }
   });


   return next;
};

exports.register.attributes = {
   name: 'route-locations'
};
