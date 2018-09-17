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
      handler: (request,h) =>
      {

      }
   });

   server.route({
      method: 'GET',
      path: '/locations/{location}',
      handler: (request,h) =>
      {

      }
   });

   // Routes
   // ------------------
   // PUT


   server.route({
      method: 'PUT',
      path: '/locations/{location}',
      handler: (request,h) =>
      {

      }
   });

   // Routes
   // ------------------
   // POST

   server.route({
      method: 'POST',
      path: '/locations/{location}',
      handler: (request,h) =>
      {
      }
   });

   // Routes
   // ------------------
   // DELETE


   server.route({
      method: 'DELETE',
      path: '/locations/{location}',
      handler: (request,h) =>
      {
      }
   });

   // 
   // 
   // 


   return next;
};


exports.register.attributes = {
   name: 'route-locations'
};




