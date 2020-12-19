import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import { Camera } from 'expo-camera';

const Screen = () => {
  const cameraRef = useRef<Camera | null>();

  const [imageUri, setImageURI] = useState<string | undefined>();

  const storeRandom = async () => {
    await firebase
      .database()
      .ref('test/')
      .set({
        lol: 'zsh la mif' + Math.random() * 1489192,
      });
  };

  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      setImageURI(photo.uri);
      console.log(photo);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Camera
        ref={(camera) => {
          cameraRef.current = camera;
        }}
        style={styles.camera}
        type={type}
      />
      <TouchableOpacity
        onPress={() => takePicture()}
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'gray',
          position: 'absolute',
          bottom: 80,
          borderRadius: 50,
          opacity: 0.5,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 100,
          height: 200,
          top: 0,
          right: 0,
          backgroundColor: 'white',
        }}
      >
        {imageUri && (
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        )}
      </View>
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
});
