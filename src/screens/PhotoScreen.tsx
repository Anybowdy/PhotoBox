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
import { Video } from 'expo-av';
import useMedia, { MediaType, Media } from '../hooks/useMedia';

interface Props {
  media: Media;
  closeView: () => void;
}

const PhotoScreen: FC<Props> = ({ closeView, media }) => {
  const { sendMedia, loading } = useMedia();

  console.log(media);

  const send = async () => {
    await sendMedia(media);
    closeView();
  };

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

      <TouchableOpacity onPress={send} style={styles.sendButton}>
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
