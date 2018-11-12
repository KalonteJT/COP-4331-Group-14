import React from 'react';
import { ActivityIndicator, Modal, Alert, Platform, StyleSheet, View, Button, TouchableHighlight, AsyncStorage, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Input, Text } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import {styles } from '../styles/neweventscreen';
import {saveUserId, getUserId} from '../utils/Storage';



export default class NewEventScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            eventName:'',
            eventTime: 'Choose Time',
            eventDate: 'Choose Date',
            userLat: '',
            userLon: '',
            eventString: 'Choose Location', 
            eventCoord: {
                latitude: 0,
                longitude: 0,
            },
            userEmail: '',
            cycler: false,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            modalVisible: false,

        }
        Geocoder.init('AIzaSyCRPspfu6DgUDUBOeqTFZMWG_CbnKHUzd8');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({userLat: position.coords.latitude, userLon: position.coords.longitude});


                console.log(position.coords.latitude + "here is lat!");
            },
            (error) => {console.log(error)}
        );

    }


    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "New Event",
            headerRight: (
                <View style={styles.buttonStyle}>
                <Button onPress={() => {
                    if (navigation.state.params.create())

                        navigation.navigate('Home');
                }}
                title="Create"
                color="#53575e"
                />
                </View>
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({create: this.createEvent.bind(this)})
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _showSpinner = () => {this.setState({cycler: true}); console.log("called this function" + JSON.stringify(this.state));};

    _showDatePicker = () => this.setState({ isDatePickerVisible: true });

    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

    _showTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ' + date);
        let constructedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
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

        if (this.state.eventName === '' || this.state.eventString === '' || this.state.eventDate === 'Choose Date' || this.state.eventTime === 'Choose Time'){
            alert('Please fill out all fields before continuing');
            return false;
        }


        //var apiKey = "6q0GvT04E_mFKH1XqLKO31Sw_6bw0i_Y";
        //var myDB = "qupdb";
        //var myCollection = "Events";
        console.log(this.state);
        getUserId().then((result) => {
            fetch("https://104.248.112.100/events", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.eventName,
                    time: this.state.eventTime,
                    loc: { 
                        coordinates[this.state.eventCoord.longitude, this.state.eventCoord.latitude] 
                    }
                    email: result,
                    eventString: this.state.eventString,
                    date: this.state.eventDate,
                    eventMembers: [result]
                })

            })}).catch(error => console.log(error));

        return true;
    }

    render(){
        return(

            <KeyboardAvoidingView style={{justifyContent: 'center', flex: 1, height: 1,
                    width: "90%",
                    marginLeft: "5%",}} enabled>
            <FormLabel>Name</FormLabel>

            <FormInput placeholder="My Awesome Event" 
            onChangeText={(value) => this.setState({eventName: value})}/>


            <FormLabel>Location</FormLabel>
            <TouchableHighlight
            onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text style={styles.eventAddressStyle}>{this.state.eventString}</Text>
            </TouchableHighlight>

            <Modal
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={{
                flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
            <MapView style= {styles.map}
            initialRegion={{
                latitude: this.state.userLat,
                    longitude: this.state.userLon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
            }}
            onPress={ (event) => {
                this.setState({ eventCoord: event.nativeEvent.coordinate})
            } }
            ><Marker
            coordinate={this.state.eventCoord}
            title="fancy Marker"
            description="fuckadescr"
            />
            </MapView>
            <View style={{flex: 1}}>

            <View style={styles.buttonStyle}>

            <Button  onPress={() => {
                this._showSpinner();
                console.log(this.state);
                Geocoder.from(this.state.eventCoord.latitude, this.state.eventCoord.longitude)
                    .then(json => {
                        var addressComponent = json.results[0].address_components;
                        this.setState({eventString: addressComponent[1].short_name + ' \n' + addressComponent[2].short_name + ', '+ addressComponent[4].short_name})
                        console.log(addressComponent);
                        this.setState({cycler: !this.state.cycler});
                        this.setModalVisible(!this.state.modalVisible);

                    })
                    .catch(error => console.warn(error));
            }} title="Set Location">

            </Button>
            <ActivityIndicator size="large" color="#0020ff" animating={this.state.cycler}/>

            </View>
            <View style={styles.loadingStyle}>

            </View>
            </View>
            </View>
            </Modal>

            <View style={{flex: 1, flexDirection: 'row'}} enabled>
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





            </KeyboardAvoidingView>

        )
    }
}
