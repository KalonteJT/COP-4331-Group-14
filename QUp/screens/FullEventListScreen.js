import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput  } from 'react-native';
import {SearchBar, Input, List, ListItem, Text } from 'react-native-elements';
import FlatList from "FlatList";
import Geocoder from 'react-native-geocoding';

import {styles } from '../styles/eventlistscreen';
import {saveUserId, getUserId} from '../utils/Storage';
 export default class FullEventListScreen extends React.Component {
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
        eventString: '',
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        
        }
        Geocoder.init('AIzaSyCRPspfu6DgUDUBOeqTFZMWG_CbnKHUzd8');
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
          var url = "https://api.mlab.com/api/1/databases/"+myDB+"/collections/Events?&apiKey="+apiKey;
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
            console.log(res);
            ;
            
          })
          .catch(error=> {
            this.setState({ error, loading: false});
          });

          console.log(JSON.stringify(this.state) + "here is state");
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
    
       goJoinEvent = (item) => {
        AsyncStorage.setItem('eventData', JSON.stringify(item));
        this.props.navigation.navigate('JoinEvent', {item});
      }
    
      render() {
        return (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={ () => this.goJoinEvent(item)}>
                  <ListItem
                    title={`${item.name} - ${item.date}`}
                    subtitle={`${item.eventString} at ${item.time}`}
                    //subtitle={`By: ${item.userEmail}`}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                </TouchableOpacity >
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