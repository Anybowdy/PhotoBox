import React, { FC, useState } from 'react';

import { StyleSheet, Image, StyleProp, ImageStyle } from 'react-native';

interface Props {
  thumbSource: string;
  alternativeSource: string;
  style: StyleProp<ImageStyle>;
}

const ThumbImage: FC<Props> = ({ thumbSource, alternativeSource, style }) => {
  const [source, setSource] = useState(thumbSource);

  const setNewSource = (newSource: string) => {
    if (source == newSource) {
      return;
    } else {
      setSource(newSource);
    }
  };

  return (
    <Image
      source={{ uri: source }}
      onError={() => setNewSource(alternativeSource)}
      style={[
        {
          width: 40,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 10,
        },
        style,
      ]}
    />
  );
};

export default ThumbImage;

const styles = StyleSheet.create({});
