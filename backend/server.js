'use strict';

const Hapi = require('hapi');
const db  = require('./db').db;
const Event = require('mongoose').Event;
const User = require('./models/user.js').User;
const Even = require('mongoose').model('Event');


const server = Hapi.server({
   port: 3000,
   host: 'localhost'
});


const init = async () => {

   // Register route "plugins"
   await server.register([  
      require('./routes/users'),
      require("./routes/events"),
   ]);

   Even.create({
      name: 'testing',
      desc: 'tested desc 2', 
      time: {
         end: Date.now
      },
   },
      function(err, event) {
         if (err) 
            return err;

         console.log(event);
      });

   await server.start();
   console.log(`Server running at: ${server.info.uri}`);
};

init();
