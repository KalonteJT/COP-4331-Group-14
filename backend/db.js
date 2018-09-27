var Mongoose = require('mongoose');
const config = require('./config.json');

var options = {
   useNewUrlParser: true,
   poolSize: 7,
   user: config.user,
   pass: config.password
}

// Load DB
Mongoose.connect(config.host + config.db, options);
var db = Mongoose.connection;

// Handle error and initial open
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
   console.log(`Connected to ${config.host+config.db}. \nQup Debug: Ignore deprecation warnings.`);
})

exports.db = db;
