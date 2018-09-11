import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

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
      <View style = {[styles.layoutContainer, styles.topBanner]}>
                    <Text style={styles.welcomeText}>Welcome to QUp!></Text>
                    </View>
                    <Button onPress={this.databaseUpdate} title="Press me" />
      <View style = {[styles.layoutContainer, styles.windowBox]}></View>
      </View>
          );
  }
}


      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  //Ensures a 1:1 Flex Ratio w/ container
  layoutContainer: {
    flex: 1,
  },
  //Flex Container for the Top Banner
  topBanner: {
    flex: 1,
    backgroundColor: '#FC4AAB',
  },
  //Flex Container for the rest of the screen
  windowBox: {
    flex: 7,
    backgroundColor: '#3F3F3F',
  },
  welcomeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 32,
    fontStyle: 'italic',
    //fontStyle: 'bold',
    backgroundColor: '#FC4AAB',
    marginTop: 25,
  },
  /*welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});
