import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScrollableAvoidView from '../components/ScrollableAvoidView';
import * as firebase from 'firebase';

const LoginScreen = () => {
  const [creds, setCreds] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const onChangeText = (field: string, newValue: string) => {
    setCreds({ ...creds, [field]: newValue });
  };

  const onLogin = async () => {
    try {
      let user = await firebase
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password);
      firebase.auth().currentUser?.updateProfile({
        displayName:
          creds.displayName == '' ? creds.email.split('@')[0] : creds.displayName,
      });
    } catch (e) {
      Alert.alert(e.toString());
    }
  };

  return (
    <ScrollableAvoidView>
      <View
        style={{
          backgroundColor: 'rgba(0,0,100,0.05)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '80%',
          }}
        >
          <Text
            style={{
              textAlign: 'left',
              fontWeight: '600',
              fontSize: 22,
              marginVertical: 20,
            }}
          >
            Créer ton compte
          </Text>
        </View>
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

        <TextInput
          placeholder='Username'
          value={creds.displayName}
          style={styles.input}
          onChangeText={(text) => onChangeText('displayName', text)}
        />

        <TouchableOpacity
          style={{
            width: '80%',
            height: 60,
            backgroundColor: '#45bbf3',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 30,
          }}
          onPress={onLogin}
        >
          <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Go</Text>
        </TouchableOpacity>
      </View>
    </ScrollableAvoidView>
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
