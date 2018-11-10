import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator} from 'react-navigation';


import HomeScreen from './screens/HomeScreen';
import NewEventScreen from './screens/NewEventScreen';
import EventListScreen from './screens/EventListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import FullEventListScreen from './screens/FullEventListScreen';
import JoinEventScreen from './screens/JoinEventScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewEvent: NewEventScreen,
    EventList: EventListScreen,
    EventDetails: EventDetailsScreen,
    FullEventList: FullEventListScreen,
    JoinEvent: JoinEventScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#298ff4', 
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
    },
 }
);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      eventName:'',
      eventTime: '',
      eventLocation: '',
      userEmail: ''
    }
  }
  render() {
    return <RootStack />;
  }
}

      
