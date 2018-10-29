import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
import {SearchBar, Input, List, ListItem, Text, Icon } from 'react-native-elements';
import FlatList from "FlatList";


import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId} from '../utils/Storage';


export default class EventListScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: (<SearchBar containerStyle={styles.searchStyle}
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

  deleteEvent(itemName) {
  	var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
      var myDB = "qupdb";
      var myCollection = "Events";
      console.log(this.state);
      var query = `{"${'name'}":"${itemName}"}`;
      console.log(itemName);
      var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/"+myCollection+"/"+itemName+"?apiKey="+apiKey;
      console.log(url);
      fetch(url,{
          method: 'delete'})
      .then(response => console.log(response));

      
      getUserId().then(this.makeRemoteRequest, (error) => {
  console.log(error) //Display error
})
    this.forceUpdate();
  }

  render() {
    return (
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              leftIcon={
              	<Icon
              		name='close'
              		color='red'
              		onPress={() => this.deleteEvent(item._id.$oid)}
              	/>
              }
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