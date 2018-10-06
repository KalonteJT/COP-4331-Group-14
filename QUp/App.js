import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import Auth0 from 'react-native-auth0';
import { createStackNavigator} from 'react-navigation';
import { FormLabel, FormInput, SearchBar, FormValidationMessage, Input, List, ListItem, ListView, Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import FlatList from "FlatList";
import jwt_decode from 'jwt-decode';
import DateTimePicker from 'react-native-modal-datetime-picker'

const auth0 = new Auth0({ domain: 'qup.auth0.com', clientId: '82KWV6LXAHtqkDcM2qNalg2HYe1Su0VH' });
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const saveUserId = async userId => {
          try {
            await AsyncStorage.setItem('userId', userId);
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
        };
  
const getUserId = async () => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem('userId') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  console.log('here it is ' + userId);
  return userId;
}



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
    .then(credentials => {
      let idInformation = jwt_decode(credentials.idToken);
      saveUserId(idInformation.email)
      let kkl = getUserId();
      console.log(kkl);
     
      })

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
            <Col><View style={styles.buttonStyle}><Button onPress={() => this.props.navigation.navigate('EventList')} title="My Event List" /></View></Col>
        </Grid>             

      <View style = {[styles.layoutContainer, styles.windowBox]}></View>
      </View> 
    
          );
    

}

    
}

class NewEventScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      eventName:'',
      eventTime: 'Choose Time',
      eventDate: 'Choose Date',
      eventLocation: '',
      userEmail: '',
      isDatePickerVisible: false,
      isTimePickerVisible: false,

    }
  }

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ' + date);
    let constructedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
    this.setState({eventDate: constructedDate});
    this._hideDatePicker();
  };

  _handleTimePicked = (time) => {
    console.log('A time has been picked'+ time);
    let constructedTime = `${time.getHours()}:${time.getMinutes()}`
    this.setState({eventTime: constructedTime});
    this._hideTimePicker();
    // style={{fontFamily: 'sans-serif-light', marginTop: 15, marginRight: 30, borderBottomColor: '#575f6b', borderBottomWidth: 1}}
  };

  createEvent(){
    var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      console.log(this.state);
      getUserId().then((result) => {
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
        userEmail: result,
        date: this.state.eventDate
      })

    })}).catch(error => console.log(error));
  }

  render(){
     return(
          <View style={{justifyContent: 'center', flex: 1, height: 1,
          width: "90%",
          marginLeft: "5%",}}>
            <FormLabel>Name</FormLabel>
            
            <FormInput placeholder="My Awesome Event" 
            onChangeText={(value) => this.setState({eventName: value})}/>
      
      
              <FormLabel>Location</FormLabel>
              
              <FormInput placeholder="P Sherman, 42 Wallaby Way"
              onChangeText={(value) => this.setState({eventLocation: value})}/>
      
      
            <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
            <FormLabel>Date</FormLabel>
            <TouchableOpacity onPress={this._showDatePicker}>
            <Text style={{marginLeft: 20, fontFamily: 'sans-serif-light', marginTop: 15,marginRight: 30, borderBottomColor: '#575f6b', borderBottomWidth: 1}}>{this.state.eventDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
         
        />
        </View>
            <View style={{flex: 1}}>
            <FormLabel>Time</FormLabel>
        <TouchableOpacity onPress={this._showTimePicker}>
            <Text style={{marginLeft: 20, fontFamily: 'sans-serif-light', marginTop: 15,marginRight: 30, borderBottomColor: '#575f6b', borderBottomWidth: 1}}>{this.state.eventTime}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode="time"
        />
        </View>
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

export class EventListScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: (<SearchBar containerStyle={{ flex: 1, 
      width: '100%', height: '100%', backgroundColor: '#FC4AAB',
      borderBottomWidth: 0, borderTopWidth: 0}}
      placeholder = "Search" 
      round
      />
    ),
  }
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
     
    }
  }

  componentWillMount() {
    getUserId().then(this.makeRemoteRequest, (error) => {
  console.log(error) //Display error
});
    
    
  }  

  makeRemoteRequest = (result) => {
    //const{ page, seed } = this.state;
    var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      console.log(this.state);
      var query = `{"${'userEmail'}":"${result}"}`;
      var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?q="+query+"&apiKey="+apiKey;
      console.log(url);
    {/*const url = `http://104.248.112.100/events`;*/}
    this.setState({ loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState ({
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error=> {
        this.setState({ error, loading: false});
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "90%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%",
        }}
      />
    );
  };

  render() {
    return (
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.name}`}
              subtitle={`${item.location} at ${item.time}`}
              //subtitle={`By: ${item.userEmail}`}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item._id}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
          //refreshing={this.state.refreshing}
          //onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewEvent: NewEventScreen,
    EventList: EventListScreen,
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
      eventLocation: '',
      userEmail: ''
    }
  }
  render() {
    return <RootStack />;
  }
}

      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    //flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
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
