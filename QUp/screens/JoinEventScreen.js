import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput  } from 'react-native';
import {SearchBar, Input, List, ListItem, Text } from 'react-native-elements';
import FlatList from "FlatList";


import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId} from '../utils/Storage';

export default class JoinEventScreen extends React.Component {

    constructor(props){
      super(props);
      this.state={
        eventMembers: [],
      }
    }


    static navigationOptions = ({navigation}) => {
        return {
          headerTitle: "Event Details",
          headerRight: (
            <View style={styles.buttonStyle}>
              <Button onPress={() => {navigation.state.params.join()}}
              title="Join Event!"
              color="#53575e"
              />
            </View>
          ),
        };
      };

    componentDidMount() {
       this.props.navigation.setParams({join: this.joinEvent.bind(this)})
    }

    joinEvent() {
      const {params} = this.props.navigation.state;
      var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      var eventId = params.item._id.$oid;
      var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"?q={_id:{$oid:'"+eventId+"'}}&apiKey="+apiKey
      console.log(url);

      fetch(url)
      .then((res) => res.json())
      .then((res) => {
        getUserId().then((result) => 
        fetch(url ,{
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          name: res[0].name,
          time: res[0].time,
          location: res[0].location,
          userEmail: res[0].userEmail,
          date: res[0].date,
          eventMembers: [result],
        })
        }).then(res => res.json()).then(console.log)) 
      })
    }


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
