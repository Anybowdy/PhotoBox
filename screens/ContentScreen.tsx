import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const ContentScreen = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems([]);
    var ref = firebase.database().ref('items');

    const onItemsAdded = ref.on('child_added', (snapshot) => {
      console.log(snapshot.val());
      setItems((old) => [...old, snapshot.val()]);
    });

    return () => {
      ref.off('child_added', onItemsAdded);
    };
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
