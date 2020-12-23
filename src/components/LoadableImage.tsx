import React, { FC, useRef, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  uri: string;
}

const LoadableImage: FC<Props> = ({ uri }) => {
  const [animating, setAnimating] = useState(true);
  const imageRef = useRef<any>(null);

  const imageFadeDuration = 400;

  const onLoadEnd = () => {
    setAnimating(false);
    imageRef.current.fadeIn(imageFadeDuration);
  };

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#45bbf3' }}>
      {animating && (
        <ActivityIndicator
          size='large'
          animating={true}
          color='black'
          style={{ width: '100%', height: '100%' }}
        />
      )}

      <Animatable.Image
        ref={(image) => {
          imageRef.current = image;
        }}
        source={{ uri: uri }}
        onLoadEnd={() => {
          onLoadEnd();
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default LoadableImage;

const styles = StyleSheet.create({});
