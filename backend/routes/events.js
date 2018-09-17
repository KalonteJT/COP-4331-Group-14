'use strict';

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
            handler: (request,h) =>
            {
               // TODO: Retrieve a list of events from the DB. Top {number} with deeper increments.
               return "{\n\t{\n\t\tname: \"test_event\",\n\t\ttime: \"13:00\",\n\t\tlocation: \"somewhere\"\n\t},"
               + "\n\t{\n\t\tname: \"fake_event\",\n\t\ttime: \"24:15\", \n\t\tlocation: \"a place\"\n\t},"
               + "\n\t{\n\t\tname: \"no_event\",\n\t\ttime: \"???\", \n\t\tlocation: \"Uhh.... error?\"\n\t}\n}";
            }
         });

         server.route({
            method: 'GET',
            path: '/events/{event}',
            handler: (request,h) =>
            {
               // TODO: Get selected event info from db
               return `{\n\tname: "${encodeURIComponent(request.params.event)}",`
                  +"\n\ttime: \"infinite\", \n\tlocation: \"space\"," 
                  + "\n\tuser: [ \"Gary\", \"Avocato\", \"Quin\", \"KEVN\" ]\n}";
            }
         });


         // Routes
         // ------------------
         // PUT
         server.route({
            method: 'PUT',
            path: '/events/',
            handler: (request,h) =>
            {
               // TODO: Place event in DB if it does not exist. Err. Otherwise (username taken)
               return `PUT that thing (${encodeURIComponent(request.payload.event)}) back where it came from....`;
            }
         });


         // Routes
         // ------------------
         // POST
         server.route({
            method: 'POST',
            path: '/events',
            handler: (request,h) =>
            {
               // TODO: Update an events info in the DB
               return `POST-ed this thing (${encodeURIComponent(request.payload.event)}) somewhere I think...`;
            }
         });


         // Routes
         // ------------------
         // DELETE
         server.route({
            method: 'DELETE',
            path: '/events/{event}',
            handler: (request,h) =>
            {
               // TODO: Remove an event from from DB. Err if event DNE.
               return `Nothing clever. DELETE THIS:  (${encodeURIComponent(request.payload.event)})`;
            }
         });
      }
   };
