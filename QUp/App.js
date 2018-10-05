import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import Auth0 from 'react-native-auth0';
import { createStackNavigator} from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Input } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
const auth0 = new Auth0({ domain: 'qup.auth0.com', clientId: '82KWV6LXAHtqkDcM2qNalg2HYe1Su0VH' });
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



 class HomeScreen extends React.Component {
    constructor(props) {
    super(props);
    
      const {navigation} = this.props.navigation;
      this._onLogin()
  }


  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: "QUp",
      headerRight: (
        <View style={styles.buttonStyle}>
          <Button onPress={() => navigation.navigate('NewEvent')}
          title="New Event"
          color="#53575e"
          />
        </View>
      ),
    };
  };
  
  getMyEvents(){
    var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      var query = '{"owner":"trevor"}';
      console.log(query);
      var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?q="+query+"&apiKey="+apiKey;
      console.log(url)
      reply = fetch(url).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    alert(JSON.stringify(myJson));
  });;

    console.log(reply)

  }


  


  _onLogin(){
    auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: 'https://qup.auth0.com/userinfo'})
    .then(credentials =>
      console.log(credentials)
      // Successfully authenticated
      // Store the accessToken
    )
    .catch(error => console.log(error));
  }


//    This is the code for connecting through the node driver
//    var MongoClient = require('mongodb').MongoClient;
//    var url = "mongodb://qupUser:#cckst5@ds247852.mlab.com:47852/qupdb"
//   // Get two properties from the user: username and email
//   console.log("Enter a name and time for your event"); 
//     //
//     // Log the results.
//     //   
//     MongoClient.connect(url, {useNewUrlParser: true}, function(err, db1) {
//  if (err) throw err;
//  var dbo = db1.db("qupdb");  
//  var myobj = {name : 'Climb the rockies', time: 'tomorrow'};
//  dbo.collection("Events").insertOne(myobj, function(err, res){
//     if (err) throw err;
//     console.log("Document created!");    
//   });
//  var query = {name : result.name};
//  dbo.collection("Events").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   db1.close(); }); 
// });  
//  }



  render() {
    
      return (
      <View style={styles.container}>
      {/*<View style = {[styles.layoutContainer, styles.topBanner]}>
                    <Text style={styles.welcomeText}>Welcome to QUp!</Text>
<<<<<<< HEAD
                    </View>
                    <Button onPress={this.databaseUpdate} title="Press me" />
                    <Button onPress={this._onLogin} title="Login" />
=======
                    </View>*/}
                    {/*<Button onPress={this.databaseUpdate} title="Press me" />*/}
       <Grid>
            <Col><View style={styles.buttonStyle}><Button title="Search Events"/></View></Col>
            <Col><View style={styles.buttonStyle}><Button onPress={() => {this.getMyEvents()}} title="My Event List" /></View></Col>
        </Grid>             

      <View style = {[styles.layoutContainer, styles.windowBox]}></View>
      </View> 
    
          );
    

}

    
}

class NewEventScreen extends React.Component {

  createEvent(){
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
        name: this.state.eventName,
        time: this.state.eventTime,
        location: this.state.eventLocation,
        owner: "trevor"
      })

    });
  }

  render(){
     return(
     <View style={styles.container}>
      <View style={styles.row}>
            <FormLabel>Name</FormLabel>
            
            <FormInput placeholder="My Awesome Event" 
            onChangeText={(value) => this.setState({eventName: value})}/>
            </View>
            <View style={styles.row}>
              <FormLabel>Location</FormLabel>
              
              <FormInput placeholder="P Sherman, 42 Wallaby Way"
              onChangeText={(value) => this.setState({eventLocation: value})}/>
            </View>
            <View style={styles.row}>
         
            <FormLabel>Time</FormLabel>
            <FormInput placeholder="When we get there"
            onChangeText={(value) => this.setState({eventTime: value})}/>
            </View>
             
         <View style={styles.buttonStyle} ><Button onPress={() => {

          this.createEvent()
          this.props.navigation.navigate('Home')}} 
         title="Create Event!" />
          
        </View>
   
        
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewEvent: NewEventScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#FC4AAB', 
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
    },
 }
);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      eventName:'',
      eventTime: '',
      eventLocation: ''
    }
  }
  render() {
    return <RootStack />;
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
  buttonStyle: {
    margin: 4,
    marginBottom: 20,
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
  preLogin: {
    flex: 1,
    backgroundColor: '#f257e2'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
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
