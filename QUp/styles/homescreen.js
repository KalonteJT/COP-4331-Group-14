import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },
  buttonStyle: {
    margin: 4,
    marginBottom: 20,
  },
  layoutContainer: {
    flex: 1,
  },
  windowBox: {
    flex: 7,
    backgroundColor: '#3F3F3F',
  },
  map:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1
  },
});

export {styles}