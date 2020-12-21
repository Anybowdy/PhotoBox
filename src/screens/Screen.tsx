import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';
import { Camera } from 'expo-camera';
import PhotoScreen from './PhotoScreen';

interface Props {
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Screen: FC<Props> = ({ setScrollEnabled }) => {
  const cameraRef = useRef<Camera | null>();
  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [imageUri, setImageURI] = useState<string | null>(null);
  const [videoUri, setVideoURI] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ quality: 0.001 });
      setImageURI(photo.uri);
    }
  };

  const closeChildView = () => {
    setImageURI(null);
    setVideoURI(null);
  };

  const onLongPress = async () => {
    if (cameraRef.current) {
      setScrollEnabled(false);
      let video = await cameraRef.current.recordAsync();
      setVideoURI(video.uri);
      console.log(video);
    }
  };

  const onPressOut = () => {
    setScrollEnabled(true);
    cameraRef.current?.stopRecording();
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
          <TouchableOpacity
            onLongPress={onLongPress}
            onPressOut={onPressOut}
            onPress={() => takePicture()}
            style={styles.snapButton}
          >
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

      {(imageUri || videoUri) && (
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <PhotoScreen
            imageUri={imageUri}
            videoUri={videoUri}
            setImageUri={setImageURI}
            closeView={closeChildView}
          />
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
