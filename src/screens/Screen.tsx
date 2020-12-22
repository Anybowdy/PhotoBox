import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import PhotoScreen from './PhotoScreen';
import { MediaType, Media } from '../hooks/useMedia';

interface Props {
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Screen: FC<Props> = ({ setScrollEnabled }) => {
  const cameraRef = useRef<Camera | null>();
  const [hasPermission, setHasPermission] = useState<Boolean>();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [media, setMedia] = useState<Media | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ quality: 0.1 });
      let newMedia: Media = { type: MediaType.Image, uri: photo.uri };
      setMedia(newMedia);
    }
  };

  const closeChildView = () => {
    setMedia(null);
  };

  const onLongPress = async () => {
    if (cameraRef.current) {
      setScrollEnabled(false);
      let video = await cameraRef.current.recordAsync();
      let newMedia: Media = { type: MediaType.Video, uri: video.uri };
      setMedia(newMedia);
    }
  };

  const onPressOut = () => {
    cameraRef.current?.stopRecording();
    setScrollEnabled(true);
  };

  if (!hasPermission || hasPermission === false) {
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

      {media && (
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <PhotoScreen closeView={closeChildView} media={media} />
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
