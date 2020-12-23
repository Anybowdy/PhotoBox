import React, { FC, useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';

interface Props {
  uri: string;
}

const LoadableImage: FC<Props> = ({ uri }) => {
  const [animating, setAnimating] = useState(true);

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#45bbf3' }}>
      {animating && (
        <ActivityIndicator
          size='large'
          animating={true}
          style={{ width: '100%', height: '100%' }}
        />
      )}

      <Image
        source={{ uri: uri }}
        onLoadEnd={() => setAnimating(false)}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default LoadableImage;

const styles = StyleSheet.create({});
