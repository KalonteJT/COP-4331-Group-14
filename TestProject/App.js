import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

export default class App extends React.Component {
	databaseUpdate(){
		var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
    	var myDB = "qupdb";
    	var myCollection = "Events";
    	fetch("https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?apiKey="+apiKey,{
      		method: 'POST',
      		headers: {
        		Accept: 'application/json',
        		'Content-Type': 'application/json',
      		},
      	body: JSON.stringify({
        name: "cook dinner",
        time: "5pm cause i'm old"
      })

    });
  }


//		This is the code for connecting through the node driver
// 		var MongoClient = require('mongodb').MongoClient;
// 		var url = "mongodb://qupUser:#cckst5@ds247852.mlab.com:47852/qupdb"
//   // Get two properties from the user: username and email
//   console.log("Enter a name and time for your event"); 
//     //
//     // Log the results.
//     //   
//     MongoClient.connect(url, {useNewUrlParser: true}, function(err, db1) {
// 	if (err) throw err;
// 	var dbo = db1.db("qupdb");	
// 	var myobj = {name : 'Climb the rockies', time: 'tomorrow'};
// 	dbo.collection("Events").insertOne(myobj, function(err, res){
//     if (err) throw err;
//     console.log("Document created!");    
//   });
// 	var query = {name : result.name};
// 	dbo.collection("Events").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   db1.close();	});	
// });  
// 	}



  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>This shit is so cool!!</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button onPress={this.databaseUpdate} title="Press me"> </Button>
      </View>
          );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
