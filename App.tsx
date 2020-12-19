import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './screens/Screen';
import LoginScreen from './screens/LoginScreen';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';

import { initializeFirebase } from './FirebaseConfig';

initializeFirebase();

export default function App() {
  const [init, setInit] = useState<Boolean | null>(null);

  const currentUser = firebase.auth().currentUser;

  const don = (user: firebase.User | null) => {
    if (user) {
      var uid = user.uid;
      console.log('User authenticated: ' + uid);
    }
    setInit(true);
  };

  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(don);
    return sub;
  }, []);

  if (!init) {
    return null;
  }

  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <Swiper index={1} showsPagination={false}>
      <View />
      <Screen />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
