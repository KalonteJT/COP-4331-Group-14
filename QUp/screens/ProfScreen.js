import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, StyleSheet } from 'react-native';

const first_name = "Sean";
const last_name = "Datta";
const email = "sean.s.datta@gmail.com";

export default class ProfileInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{padding: 0, backgroundColor: '#3F3F3F'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#3F3F3F', backgroundColor: '#FC4AAB', textAlign: 'center'}}>
                    {"\nUser Profile for"} {first_name} {last_name} {"\n"}</Text>
                <Text>{'\n\n'}</Text>
                <Text style={{fontWeight: 'bold', color: 'white'}}>{"\tEmail:"} {email}</Text>

                <View style={{padding: 27}}>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>{'\nAbout Me'}</Text>
                    <TextInput
                        style={{height: 40, color: 'white'}}
                        placeholder="Add a description here!"
                        placeholderTextColor='white'
                        onChangeText={(text) => this.setState({text})}
                    />
                </View>
            </View>
        );
    }
}
