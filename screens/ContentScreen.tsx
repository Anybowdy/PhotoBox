import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const ContentScreen = () => {
  const list = async () => {
    let ref = firebase.storage().ref();
    var test = ref.child('images');
    let response = await test.listAll();

    response.prefixes.forEach((item) => console.log(item.name));
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});
