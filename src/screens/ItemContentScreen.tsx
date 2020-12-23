import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';
import { FontAwesome } from '@expo/vector-icons';
import LoadableImage from '../components/LoadableImage';
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
    <View style={styles.view}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name='arrow-left' size={30} color='white' />
        </TouchableOpacity>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>
            {item.author}
          </Text>
          <Text style={{ fontSize: 15, color: '#333536' }}>{item.postedAt()}</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <LoadableImage uri={item.imageURL} mediaType={item.mediaType} />
      </View>
    </View>
  );
};

export default ItemContentScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#45bbf3',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topView: {
    height: '5%',
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentView: {
    width: '90%',
    height: '80%',
    marginVertical: '6%',
    borderRadius: 25,
    overflow: 'hidden',
  },
});
