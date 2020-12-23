import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import Item from '../models/Items';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([]);
    var itemsRef = firebase.database().ref('items').orderByChild('timestamp');

    const onItemsAdded = itemsRef.on('child_added', (snapshot) => {
      let response = snapshot.val();
      let realItem = plainToClass(Item, response as JSON);
      //console.log(realItem);

      setItems((old) => [realItem, ...old]);
    });

    return () => {
      itemsRef.off('child_added', onItemsAdded);
    };
  }, []);

  return { items };
};

export default useItems;
