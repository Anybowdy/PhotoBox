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

interface Props {
  imageUri: string;
  setImageUri: React.Dispatch<React.SetStateAction<string | null>>;
}

const PhotoScreen: FC<Props> = ({ imageUri, setImageUri }) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const onSend = async () => {
    setLoading(true);
    try {
      const fetchedImage = await fetch(imageUri);
      const blob = await fetchedImage.blob();

      const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      let ref = firebase
        .storage()
        .ref()
        .child('images/' + imageName);

      await ref.put(blob);
      await ref.getDownloadURL().then((url) => {
        firebase.database().ref('items/').push().set({
          email: firebase.auth().currentUser?.email,
          imageURL: url,
        });
      });
    } catch (e) {
      console.log('Error while uploading the image: ' + e);
    }
    firebase.storage().ref().getDownloadURL;
    setLoading(false);
    setImageUri(null);
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        )}
      </View>
      <TouchableOpacity onPress={() => setImageUri(null)} style={styles.closeButton}>
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
