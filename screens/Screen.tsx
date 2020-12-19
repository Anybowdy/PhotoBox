import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import { Camera } from 'expo-camera';
import PhotoScreen from './PhotoScreen';

import Swiper from 'react-native-swiper';

const Screen = () => {
  const cameraRef = useRef<Camera | null>();
  const [imageUri, setImageURI] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ quality: 0.2 });
      setImageURI(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Camera
          ref={(camera) => {
            cameraRef.current = camera;
          }}
          style={styles.camera}
          type={type}
        />
        {true && (
          <TouchableOpacity onPress={() => takePicture()} style={styles.snapButton}>
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'white',
                borderRadius: 40,
              }}
            ></View>
          </TouchableOpacity>
        )}
      </View>

      {imageUri && (
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <PhotoScreen imageUri={imageUri} setImageUri={setImageURI} />
        </View>
      )}
    </>
  );
};

export default Screen;

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
  snapButton: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: 80,
    borderRadius: 50,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});