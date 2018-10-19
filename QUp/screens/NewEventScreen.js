import React from 'react';
import { Platform, StyleSheet, View, Button, AsyncStorage, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Input, Text } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';


import {styles } from '../styles/neweventscreen';
import {saveUserId, getUserId} from '../utils/Storage';



export default class NewEventScreen extends React.Component {
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
            <Text style={styles.dateTimeStyle}>{this.state.eventDate}</Text>
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
            <Text style={styles.dateTimeStyle}>{this.state.eventTime}</Text>
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
         title="Create Event!" 
         color='#f49842'/>
          
      </View>
          

    </View>
          
      
    )
  }
}