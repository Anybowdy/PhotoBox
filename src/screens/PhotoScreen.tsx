import React, { FC, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { Video } from 'expo-av';
import { uuidv4 } from '../Utils';
import Item from '../models/Items';

interface Props {
  imageUri: string | null;
  videoUri: string | null;
  closeView: () => void;
}

const PhotoScreen: FC<Props> = ({ imageUri, videoUri, closeView }) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const onSend = async () => {
    if (imageUri) {
      sendPicture(imageUri);
    } else {
      console.log('sending video');
    }
  };

  const sendPicture = async (imageUri: string) => {
    setLoading(true);
    try {
      const fetchedImage = await fetch(imageUri);
      const blob = await fetchedImage.blob();

      const imageDir = 'images/' + uuidv4() + '/';
      let directoryRef = firebase.storage().ref().child(imageDir);
      let ref = directoryRef.child('original');

      await ref.put(blob);
      await ref.getDownloadURL().then((url) => {
        let itemsRef = firebase.database().ref('items/').push();

        let thumbURL = url.replace('original', 'thumb@128_original');
        let newItem = new Item(
          firebase.auth().currentUser?.displayName ?? 'Inconnu',
          url,
          thumbURL
        );
        itemsRef.set(newItem);
      });
    } catch (e) {
      console.log('Error while uploading the image: ' + e);
    }
    firebase.storage().ref().getDownloadURL;
    setLoading(false);
    closeView();
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        )}
        {videoUri && (
          <Video
            source={{ uri: videoUri }}
            style={{ width: '100%', height: '100%' }}
            shouldPlay
            isLooping
            resizeMode='cover'
          />
        )}
      </View>
      <TouchableOpacity onPress={() => closeView()} style={styles.closeButton}>
        <FontAwesome name='close' size={30} color='white' />
      </TouchableOpacity>

      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <>
            <Ionicons name='send-sharp' size={24} color='black' />
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Envoyer</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  closeButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 150,
    height: 55,
    backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    padding: 5,
  },
});
