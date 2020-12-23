import React, { FC, useRef, useState } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MediaType } from '../models/Media';
import { Video } from 'expo-av';

interface Props {
  uri: string;
  mediaType: MediaType;
}

const LoadableImage: FC<Props> = ({ uri, mediaType = MediaType.Image }) => {
  const [animating, setAnimating] = useState(true);
  const animatedViewRef = useRef<any>(null);

  const videoRef = useRef<any>(null);

  const imageFadeDuration = mediaType == MediaType.Image ? 500 : 1200;

  const onLoadEnd = () => {
    setAnimating(false);
    animatedViewRef.current.fadeIn(imageFadeDuration);
  };

  const onVideoTap = () => {
    let ref = videoRef.current;
    if (ref) {
      if (ref) {
      }
    }
  };

  return (
    <>
      {animating && (
        <ActivityIndicator
          size='large'
          animating={true}
          color='black'
          style={styles.fullScreen}
        />
      )}
      <Animatable.View
        ref={(view) => {
          animatedViewRef.current = view;
        }}
      >
        {mediaType == MediaType.Image && (
          <Image source={{ uri: uri }} onLoadEnd={onLoadEnd} style={styles.fullScreen} />
        )}
        {mediaType == MediaType.Video && (
          <Video
            source={{ uri: uri }}
            style={styles.fullScreen}
            shouldPlay
            isLooping
            onLoad={onLoadEnd}
            resizeMode='cover'
          />
        )}
      </Animatable.View>
    </>
  );
};

export default LoadableImage;

const styles = StyleSheet.create({
  fullScreen: { height: '100%', width: '100%' },
});
