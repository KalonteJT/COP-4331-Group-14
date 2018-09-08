var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://qupUser:#cckst5@ds247852.mlab.com:47852/qupdb"
var prompt = require('prompt');

  //
  // Start the prompt
  //
  prompt.start();

  //
  // Get two properties from the user: username and email
  console.log("Enter a name and time for your event");
  prompt.get(['name', 'time'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  Event name: ' + result.name);
    console.log('  Time: ' + result.time);

    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db1) {
	if (err) throw err;
	var dbo = db1.db("qupdb");
	
	var myobj = {name : result.name, time: result.time};
	dbo.collection("Events").insertOne(myobj, function(err, res){

    if (err) throw err;
    console.log("Document created!");
    
  });
	var query = {name : result.name};
	dbo.collection("Events").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  

  db1.close();	});
	
});
  });
