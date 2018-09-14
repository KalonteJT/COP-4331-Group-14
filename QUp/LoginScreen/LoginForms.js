import React from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, StatusBar} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username or Email"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          style={styles.input}
          />
        <TextInput
          placeholder="Password"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25
  },
  input: {
    height: 40,
    backgroundColor: '#008b8b',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#5f9ea0',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
  }
});
