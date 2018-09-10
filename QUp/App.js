/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      <View style = {[styles.layoutContainer, styles.topBanner]}></View>
                    <Text style={styles.welcomeText}>Welcome to QUp!</Text>
      <View style = {[styles.layoutContainer, styles.windowBox]}></View>
      </View>
    );
  }
}
// Left this code here for reference in styling
/*
<Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  //Ensures a 1:1 Flex Ratio w/ container
  layoutContainer: {
    flex: 1,
  },
  //Flex Container for the Top Banner
  topBanner: {
    flex: 1,
    backgroundColor: '#FC4AAB',
  },
  //Flex Container for the rest of the screen
  windowBox: {
    flex: 7,
    backgroundColor: '#F7F2F5',
    textAlign: 'center',
    color: 'black',
  },
  welcomeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    backgroundColor: '#F7F2F5',
  },
  /*welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});
