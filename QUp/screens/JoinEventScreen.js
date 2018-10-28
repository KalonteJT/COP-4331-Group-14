import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput  } from 'react-native';
import {SearchBar, Input, List, ListItem, Text } from 'react-native-elements';
import FlatList from "FlatList";


import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId} from '../utils/Storage';

export default class JoinEventScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
          headerTitle: "Event Details",
        };
      };

    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
      }

    render() {
        return (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        );
      }
}