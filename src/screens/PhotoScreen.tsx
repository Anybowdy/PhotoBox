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

export enum MediaType {
  Image,
  Video,
}

export interface Media {
  uri: string;
  type: MediaType;
}

interface Props {
  imageUri: string | null;
  videoUri: string | null;
  media: Media;

  closeView: () => void;
}

const PhotoScreen: FC<Props> = ({ imageUri, videoUri, closeView, media }) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const onSend = async () => {
    // if (imageUri) {
    //   sendPicture(imageUri);
    // } else if (videoUri) {
    //   sendVideo(videoUri);
    // }
    sendMedia(media);
  };

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
          thumbURL
        );
        itemsRef.set(newItem);
      });
    } catch {
      console.log('Error while posting video');
    }

    setLoading(false);
    closeView();
  };

  console.log(media);

  // const sendVideo = async (videoUri: string) => {
  //   console.log('send video');

  //   setLoading(true);
  //   try {
  //     const fetchedVideo = await fetch(videoUri);
  //     const blob = await fetchedVideo.blob();

  //     const videoDir = 'videos/' + uuidv4() + '/';
  //     let directoryRef = firebase.storage().ref().child(videoDir);
  //     let ref = directoryRef.child('original');

  //     await ref.put(blob);
  //     await ref.getDownloadURL().then((url) => {
  //       let itemsRef = firebase.database().ref('items/').push();

  //       let thumbURL = url.replace('original', 'thumb@128_original');
  //       let newItem = new Item(
  //         firebase.auth().currentUser?.displayName ?? 'Inconnu',
  //         url,
  //         thumbURL
  //       );
  //       itemsRef.set(newItem);
  //     });
  //   } catch {
  //     console.log('Error while posting video');
  //   }

  //   setLoading(false);
  //   closeView();
  // };

  // const sendPicture = async (imageUri: string) => {
  //   setLoading(true);
  //   try {
  //     const fetchedImage = await fetch(imageUri);
  //     const blob = await fetchedImage.blob();

  //     const imageDir = 'images/' + uuidv4() + '/';
  //     let directoryRef = firebase.storage().ref().child(imageDir);
  //     let ref = directoryRef.child('original');

  //     await ref.put(blob);
  //     await ref.getDownloadURL().then((url) => {
  //       let itemsRef = firebase.database().ref('items/').push();

  //       let thumbURL = url.replace('original', 'thumb@128_original');
  //       let newItem = new Item(
  //         firebase.auth().currentUser?.displayName ?? 'Inconnu',
  //         url,
  //         thumbURL
  //       );
  //       itemsRef.set(newItem);
  //     });
  //   } catch (e) {
  //     console.log('Error while uploading the image: ' + e);
  //   }
  //   setLoading(false);
  //   closeView();
  // };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {media && media.type == MediaType.Image && (
          <Image source={{ uri: media.uri }} style={{ width: '100%', height: '100%' }} />
        )}
        {media && media.type == MediaType.Video && (
          <Video
            source={{ uri: media.uri }}
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
