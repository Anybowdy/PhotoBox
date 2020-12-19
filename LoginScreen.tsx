import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as firebase from 'firebase';
import Screen from './Screen';

const LoginScreen = () => {
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });

  const [authenticated, setAuthenticated] = useState(false);

  const onChangeText = (field: string, newValue: string) => {
    setCreds({ ...creds, [field]: newValue });
  };

  const onLogin = async () => {
    try {
      let user = await firebase
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password);
    } catch (e) {
      console.log('Error while login: ' + e);
    }
  };

  const listenToAuthChanges = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log(user);
        setAuthenticated(true);
      } else {
        // User is signed out
        // ...
      }
    });
  };

  useEffect(() => {
    listenToAuthChanges();
  }, []);

  if (authenticated) {
    return <Screen />;
  }

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput
        placeholder='Email'
        value={creds.email}
        style={styles.input}
        onChangeText={(text) => onChangeText('email', text)}
      />

      <TextInput
        placeholder='Password'
        value={creds.password}
        style={styles.input}
        onChangeText={(text) => onChangeText('password', text)}
      />

      <TouchableOpacity
        style={{
          width: '80%',
          height: 60,
          backgroundColor: 'rgba(200,20,200,0.1)',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}
        onPress={onLogin}
      >
        <Text style={{ fontSize: 20, fontWeight: '500' }}>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});
