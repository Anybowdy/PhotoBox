import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const ContentScreen = () => {
  const [pic, setPic] = useState<string[]>([]);

  var ref = firebase.database().ref('items');

  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log('data ' + data);
  });

  // const list = async () => {
  //   let ref = firebase.storage().ref();
  //   var test = ref.child('images');
  //   let response = await test.listAll();

  //   response.items.forEach((item) => {
  //     setPic((old) => [...old, item.name]);
  //   });
  // };

  useEffect(() => {
    setPic([]);
    var ref = firebase.database().ref('items');

    const tes = ref.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('data ' + data);
    });

    return () => {
      ref.off('value', tes);
    };
    //list();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(200,100,200,0.1)' }}>
      <FlatList
        keyExtractor={(item, index) => item}
        data={pic}
        renderItem={() => (
          <View
            style={{
              width: '100%',
              height: 80,
              backgroundColor: 'red',
              marginVertical: 20,
            }}
          />
        )}
      />
      <Text></Text>
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});
