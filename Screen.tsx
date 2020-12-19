import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Camera } from 'expo-camera';

const Screen = () => {
  const storeRandom = async () => {
    await firebase
      .database()
      .ref('test/')
      .set({
        lol: 'zsh la mif' + Math.random() * 1489192,
      });
  };

  const [hasPermission, setHasPermission] = useState<Boolean | undefined>();
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Camera style={styles.camera} type={type} />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'gray',
          position: 'absolute',
          bottom: 80,
          borderRadius: 50,
          opacity: 0.5,
        }}
      ></View>
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
