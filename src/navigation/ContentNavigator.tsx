import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContentListScreen from '../screens/ContentListScreen';
import ItemContentScreen from '../screens/ItemContentScreen';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import { Media } from '../hooks/useMedia';
import Item from '../models/Items';

export type RootStackParamList = {
  ContentListScreen: undefined;
  ItemContentScreen: { item: Item };
};

const Stack = createStackNavigator<RootStackParamList>();

const ContentNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='ContentListScreen'
          component={ContentListScreen}
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
        <Stack.Screen
          name='ItemContentScreen'
          component={ItemContentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ContentNavigator;

const styles = StyleSheet.create({});
