import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';


export default class App extends React.Component {
  render() {
    return (
      
        <View style={styles.titlelogoLogin}>
          <Text style={styles.title}>QUp</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm/>
        </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  titlelogoLogin: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#00008b',
    fontSize: 60,
    textAlign: 'center'
  }
});
