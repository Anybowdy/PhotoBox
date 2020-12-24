import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import Item from '../models/Items';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  var itemsRef = firebase
    .database()
    .ref('items')
    //.limitToLast(20)
    .orderByChild('timestamp');

  useEffect(() => {
    setItems([]);
    const onItemsAdded = itemsRef.on('child_added', (snapshot) => {
      let response = snapshot.val();
      let realItem = plainToClass(Item, response as JSON);
      //console.log(realItem);
      setItems((old) => [realItem, ...old].slice(0, 15));
    });

    return () => {
      itemsRef.off('child_added', onItemsAdded);
    };
  }, []);

  return { items };
};

export default useItems;
