import {AsyncStorage} from 'react-native';

export const saveUserId = async userId => {
      try {
        await AsyncStorage.setItem('userId', userId);
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
};
  
export const getUserId = async () => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem('userId') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  console.log('here it is ' + userId);
  return userId;
}



