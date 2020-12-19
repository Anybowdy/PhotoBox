import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const ContentScreen = () => {
  const [items, setItems] = useState<any[] | null>(null);

  // const list = async () => {
  //   let ref = firebase.storage().ref();
  //   var test = ref.child('images');
  //   let response = await test.listAll();

  //   response.items.forEach((item) => {
  //     setPic((old) => [...old, item.name]);
  //   });
  // };

  useEffect(() => {
    setItems([]);
    var ref = firebase.database().ref('items');

    const tes = ref.on('value', (snapshot) => {
      console.log(snapshot.val());
      setItems((old) => [...old, snapshot.val()]);
    });

    return () => {
      ref.off('value', tes);
    };
    //list();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(200,100,200,0.1)' }}>
      {items && (
        <FlatList
          keyExtractor={(item, index) => item?.imageUri}
          data={items}
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
      )}
      <Text></Text>
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});
