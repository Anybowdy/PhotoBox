import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './screens/Screen';
import LoginScreen from './screens/LoginScreen';
import ContentScreen from './screens/ContentScreen';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';

import { initializeFirebase } from './FirebaseConfig';

initializeFirebase();

export default function App() {
  const [init, setInit] = useState<Boolean | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const don = (user: firebase.User | null) => {
    if (user) {
      var uid = user.uid;
      console.log('User authenticated: ' + uid);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
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

  if (!authenticated) {
    return <LoginScreen />;
  }

  return (
    <Swiper index={1} showsPagination={false} loop={false} scrollEnabled={scrollEnabled}>
      <ContentScreen />
      <Screen setScrollEnabled={setScrollEnabled} />
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
