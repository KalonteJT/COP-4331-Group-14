import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput  } from 'react-native';
import {SearchBar, Input, List, ListItem, Text } from 'react-native-elements';
import FlatList from "FlatList";
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId, getUserLatLon} from '../utils/Storage';

 export default class JoinEventScreen extends React.Component {

      constructor(props) {
        super(props);
      this.state= {

        eventCoord: {
        latitude: 0,
        longitude: 0,
        },
      }
      getUserLatLon().then((result) => {
            console.log(result.latitude);
            this.setState({eventCoord: {latitude: result.latitude, longitude: result.longitude}});
         });

      console.log(this.state);
  }

     static navigationOptions = ({navigation}) => {
        return {
          headerTitle: "Event Details",
          headerRight: (
            <View style={styles.buttonStyle}>
              <Button onPress={() => navigation.navigate('EventList')}
              title="Join Event!"
              color="#53575e"
              />
            </View>
          ),
        };
      };
     
     render() {
         const {params} = this.props.navigation.state;
         

        return (
          
          <View style={{    
            marginTop: "3%",
            alignContent: 'center',
            flex: 1, height: 1,
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
            fontSize: 20,
          }}>
             <Text style={{fontWeight: 'bold', fontSize: 40}}> 
              {params.item.name} 
            </Text>
            <Text>Location: {params.item.eventString}</Text>
            <Text>Date: {params.item.date}</Text>
            <Text>Time: {params.item.time}</Text>
            <MapView style={{
                    flex: 1,
                    marginTop: "5%",
                    zIndex: -1
                  }}
                  initialRegion={{
                    latitude: params.item.eventCoord.latitude,
                    longitude: params.item.eventCoord.longitude,
                    latitudeDelta: 0.1088,
                    longitudeDelta: 0.1821,
                  }}
                  
                ><Marker
      coordinate={params.item.eventCoord}
      title="fancy Marker"
      description="fuckadescr"
    />
    <Marker
      coordinate={this.state.eventCoord}
      title="My Location"
      description="Im chillin here"
      pinColor={"#339FFF"}
    />
        </MapView>
           </View>
        );
      }
} 