import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Media } from '../hooks/useMedia';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentListScreen'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ContentListScreen'>;
type TestProp = RouteProp<{ params: { media: Media } }, 'params'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: TestProp;
};

const ItemContentScreen: FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '90%',
          height: '80%',
          backgroundColor: 'white',
          marginVertical: '15%',
          borderRadius: 25,
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: params.media.uri }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      <Text></Text>
    </View>
  );
};

export default ItemContentScreen;

const styles = StyleSheet.create({});
