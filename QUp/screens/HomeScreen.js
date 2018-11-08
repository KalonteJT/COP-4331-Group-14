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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({userLat: position.coords.latitude, userLon: position.coords.longitude});
        saveUserLatLon(position.coords);

        console.log(position.coords.latitude + "here is lat!");
      },
      (error) => {console.log(error)}
    );

  }

  render() {
    
      return (
      <View style={styles.container}>

       <Grid>
       
            <Col><View style={styles.buttonStyle}><Button onPress={() => this.props.navigation.navigate('FullEventList')} title="Browse Events" /></View></Col>
            <Col><View style={styles.buttonStyle}><Button onPress={() => this.props.navigation.navigate('EventList')} title="My Event List" /></View></Col>
        </Grid>             
        <MapView style= {styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />

      
      </View> 
    
          );
  }

    
}

