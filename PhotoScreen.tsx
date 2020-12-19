import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
      <TouchableOpacity onPress={() => setImageUri(null)} style={styles.closeButton}>
        <FontAwesome name='close' size={30} color='white' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.sendButton}>
        <Ionicons name='send-sharp' size={24} color='black' />
        <Text style={{ fontSize: 18, fontWeight: '500' }}>ENVOYER</Text>
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
    width: 200,
    height: 55,
    backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    padding: 15,
  },
});
