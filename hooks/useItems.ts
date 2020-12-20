import { useState, useEffect } from 'react';
import * as firebase from 'firebase';

const useItems = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems([]);
    var itemsRef = firebase.database().ref('items').orderByChild('timestamp');

    const onItemsAdded = itemsRef.on('child_added', (snapshot) => {
      console.log('Item added');
      setItems((old) => [snapshot.val(), ...old]);
    });

    return () => {
      itemsRef.off('child_added', onItemsAdded);
    };
  }, []);

  return { items };
};

export default useItems;
