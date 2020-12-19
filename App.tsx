import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';
import LoginScreen from './LoginScreen';

import { initializeFirebase } from './FirebaseConfig';

export default function App() {
  initializeFirebase();

  if (true) {
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
