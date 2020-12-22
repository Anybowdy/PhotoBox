import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';

import ContentNavigator from './src/navigation/ContentNavigator';

import Screen from './src/screens/Screen';
import LoginScreen from './src/screens/LoginScreen';
import ContentScreen from './src/screens/ContentScreen';

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
      <ContentNavigator />
      <Screen setScrollEnabled={setScrollEnabled} />
    </Swiper>
  );
}
