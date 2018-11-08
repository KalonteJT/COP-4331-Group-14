import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput  } from 'react-native';
import {SearchBar, Input, List, ListItem, Text } from 'react-native-elements';
import FlatList from "FlatList";


import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId} from '../utils/Storage';



export default class EventDetailsScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: "Event Details",
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
        <Text>Location: {params.item.location}</Text>
        <Text>Date: {params.item.date}</Text>
        <Text>Time: {params.item.time}</Text>

      </View>
    );
  }
}