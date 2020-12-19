import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';
import LoginScreen from './LoginScreen';
import * as firebase from 'firebase';

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

  return <Screen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
