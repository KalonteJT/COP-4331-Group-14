import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 4,
    marginBottom: 20,
    flex: 1
  },
  setLocationButtonStyle: {
    height: 85,
    flex: 1,
    backgroundColor: "#FFBB34",
    borderColor: "#555555",
    borderWidth: 0,
    borderRadius: 0,
    marginTop: 200,
    justifyContent: "flex-start"
},
  dateTimeStyle: {
    marginLeft: 20, 
    fontFamily: 'sans-serif-light', 
    marginTop: 15,
    marginRight: 30, 
    borderBottomColor: '#575f6b', 
    borderBottomWidth: 1
  },
  eventAddressStyle: {
    marginLeft: 20, 
    fontFamily: 'sans-serif-light', 
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