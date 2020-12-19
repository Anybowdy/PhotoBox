import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  imageUri: string;
  setImageUri: React.Dispatch<React.SetStateAction<string | null>>;
}

const PhotoScreen: FC<Props> = ({ imageUri, setImageUri }) => {
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setImageUri(null)}
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          top: 50,
          left: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontAwesome name='close' size={30} color='white' />
      </TouchableOpacity>
    </>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({});
