import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Media } from '../hooks/useMedia';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';
import { FontAwesome } from '@expo/vector-icons';
import LoadableImage from '../components/LoadableImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Item from '../models/Items';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentListScreen'
>;
type ProfileScreenRouteProp = RouteProp<{ params: { item: Item } }, 'params'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const ItemContentScreen: FC<Props> = ({ navigation, route: { params } }) => {
  const item = params.item;

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={30} color='white' />
        </TouchableOpacity>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>
            {item.author}
          </Text>
          <Text style={{ fontSize: 15, color: '#333536' }}>{item.timestamp}</Text>
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
        <LoadableImage uri={item.imageURL} />
      </View>
      <Text></Text>
    </View>
  );
};

export default ItemContentScreen;

const styles = StyleSheet.create({});
