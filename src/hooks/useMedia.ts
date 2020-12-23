import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { uuidv4 } from '../Utils';
import Item from '../models/Items';
import { Media, MediaType } from '../models/Media';

const useMedia = () => {
  const [loading, setLoading] = useState<Boolean>(false);

  const sendMedia = async (media: Media) => {
    setLoading(true);

    try {
      const fetched = await fetch(media.uri);
      const blob = await fetched.blob();
      const storageDirectory = media.type == MediaType.Image ? 'images/' : 'videos/';

      const itemDirectoryPath = storageDirectory + uuidv4() + '/';
      let directoryRef = firebase.storage().ref().child(itemDirectoryPath);
      let ref = directoryRef.child('original');

      await ref.put(blob);
      await ref.getDownloadURL().then((url) => {
        let itemsRef = firebase.database().ref('items/').push();

        let thumbURL = url.replace('original', 'thumb@128_original');
        let newItem = new Item(
          firebase.auth().currentUser?.displayName ?? 'Inconnu',
          url,
          thumbURL,
          media.type
        );
        itemsRef.set(newItem);
      });
    } catch {
      console.log('Error while posting video');
    }

    setLoading(false);
  };

  return { sendMedia, loading };
};

export default useMedia;
