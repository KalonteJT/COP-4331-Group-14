'use strict';

const Hapi = require('hapi');
const db  = require('./db').db;
const Event = require('mongoose').Event;
const User = require('./models/user.js').User;


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


const init = async () => {

    // Register route "plugins"
    await server.register([
        require('./routes/defaults'),
        require('./routes/users'),
        require("./routes/events"),
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
