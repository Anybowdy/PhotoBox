import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Media } from '../hooks/useMedia';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentListScreen'
>;
type ProfileScreenRouteProp = RouteProp<{ params: { media: Media } }, 'params'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ItemContentScreen: FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#45bbf3',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: '5%',
          width: '90%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FontAwesome name='arrow-left' size={30} color='white' />
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>
            JosephHuang
          </Text>
          <Text style={{ fontSize: 15, color: '#333536' }}>
            Posté aujourd'hui à 19:52
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          height: '80%',
          backgroundColor: 'white',
          marginVertical: '6%',
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
