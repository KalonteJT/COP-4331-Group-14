import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import Auth0 from 'react-native-auth0';
import { createStackNavigator} from 'react-navigation';
import { FormLabel, FormInput, SearchBar, FormValidationMessage, Input, List, ListItem, ListView, Text } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import FlatList from "FlatList";
import jwt_decode from 'jwt-decode';
import MapView from 'react-native-maps';
import DateTimePicker from 'react-native-modal-datetime-picker';
/*
const auth0 = new Auth0({ domain: 'qup.auth0.com', clientId: '82KWV6LXAHtqkDcM2qNalg2HYe1Su0VH' });*/
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, 
    (error)=> alert(JSON.stringify(error)), 
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    this.watchID = navigator.geolocation.watchPosition((position)=> {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
      this.setState({initialRegion: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }
  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <View style = {styles.container}>
      
      <MapView style = {styles.map}
      region = {this.state.initialPosition}>
      <MapView.Marker
      coordinate= {this.state.markerPosition}>
      <View style={styles.radius}>
      <View style={styles.marker}>
      
      </View>
      </View>
      </MapView.Marker>
      </MapView>
      </View>
    );
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
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
    //backgroundColor: '#3F3F3F',
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
