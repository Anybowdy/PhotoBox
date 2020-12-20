import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

const useItems = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems([]);
    var itemsRef = firebase.database().ref('items');

    const onItemsAdded = itemsRef.on('child_added', (snapshot) => {
      console.log(snapshot.val());
      setItems((old) => [...old, snapshot.val()]);
    });

    return () => {
      itemsRef.off('child_added', onItemsAdded);
    };
  }, []);

  return { items };
};

export default useItems;

const styles = StyleSheet.create({});
