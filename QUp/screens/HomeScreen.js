import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import Auth0 from 'react-native-auth0';
import { createStackNavigator} from 'react-navigation';
import { FormLabel, FormInput, SearchBar, FormValidationMessage, Input, List, ListItem, ListView, Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import FlatList from "FlatList";
import jwt_decode from 'jwt-decode';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {styles } from '../styles/homescreen';
import {saveUserId, getUserId, saveUserLatLon, getUserLatLon} from '../utils/Storage';




const auth0 = new Auth0({ domain: 'qup.auth0.com', clientId: '82KWV6LXAHtqkDcM2qNalg2HYe1Su0VH' });

export default class HomeScreen extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      markers: [{
        title: 'FINISH',
        coordinates: {
          latitude: 37.78825,
          longitude: -122.4324
        }, 
      }],
      userLat: 37.78825,
      userLon: -122.4324,
      loading: false,
      userEmail: '',
      data: [],
      eventString: '',
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,

          };
      
      const {navigation} = this.props.navigation;
      this._onLogin()
      navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({userLat: position.coords.latitude, userLon: position.coords.longitude});
              saveUserLatLon(position.coords);
      
              console.log(position.coords.latitude + "here is lat!");
            },
            (error) => {console.log(error)}
          );
      
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

  _onLogin(){
    auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: 'https://qup.auth0.com/userinfo'})
    .then(credentials => {
      let idInformation = jwt_decode(credentials.idToken);
      console.log('heres my email!! ' + idInformation.email);
      saveUserId(idInformation.email)
      let kkl = getUserId();
      console.log('this is the user id' + kkl);
      
     
      })

    .catch(error => console.log(error));

    

  }

  componentDidMount() {
    getUserId().then(this.makeRemoteRequest, (error) => {
  console.log(error) //Display error
});

 this.forceUpdate();
};





  makeRemoteRequest = (result) => {
    //const{ page, seed } = this.state;
    var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      
      var query = `{"${'eventMembers'}":"${result}"}`;
      var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?q="+query+"&apiKey="+apiKey;
      console.log(url);
    {/*const url = `http://104.248.112.100/events`;*/}
    
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState ({
          userEmail: result,
          data: res,
          error: res.error || null,
          loading: false,
          refreshing: false
        });

        for (let mk of this.state.data) {
      var marker = this.state.markers;
      marker.push({title: mk.name, coordinates: {latitude: mk.eventCoord.latitude, longitude: mk.eventCoord.longitude}});
      this.setState({markers: marker});
  }

      })
      .catch(error=> {
        this.setState({ error, loading: false});
      });

      
   }
      
    
  Rerender = () => {
    this.setState({refreshing: !this.state.refreshing});
    
     }

  


  render() {

      console.log(this.state);
    
      return (
      <View style={styles.container}>

       <Grid>
       
            <Col><View style={styles.buttonStyle}><Button onPress={() => this.props.navigation.navigate('FullEventList')} title="Browse Events" /></View></Col>
            <Col><View style={styles.buttonStyle}><Button onPress={() => this.props.navigation.navigate('EventList')} title="My Event List" /></View></Col>
        </Grid>             
        <MapView style= {styles.map}
    initialRegion={{
      latitude: this.state.userLat,
      longitude: this.state.userLon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
{ this.state.markers.map(marker => (
              <MapView.Marker
                coordinate = {marker.coordinates}
                title = {marker.title}
                
              />
            ))}
  </MapView>
      
      
      </View> 
    
          );
  }

    
}

