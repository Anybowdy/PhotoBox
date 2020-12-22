import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContentScreen from '../screens/ContentScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const ContentNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='ContentScreen'
          component={ContentScreen}
          options={{
            headerTitle: () => (
              <Image
                source={require('../../assets/logo.png')}
                style={{ width: 40, height: 40, bottom: 5 }}
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 20,
                }}
              >
                <FontAwesome name='power-off' size={30} color='black' />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ContentNavigator;

const styles = StyleSheet.create({});
