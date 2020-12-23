import React, { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useItems from '../hooks/useItems';
import ThumbImage from '../components/ThumbImage';

import { getReadableFromTimestamp } from '../Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Media, MediaType } from '../models/Media';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/ContentNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContentListScreen'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ContentListScreen: FC<Props> = ({ navigation }) => {
  const { items } = useItems();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: 'white' }}
        keyExtractor={(item) => item.id}
        data={items}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ItemContentScreen', {
                item: items[index],
              })
            }
            style={styles.itemCell}
          >
            {item.mediaType == MediaType.Image && (
              <ThumbImage
                thumbSource={item.thumbURL}
                alternativeSource={item.imageURL}
                style={{ marginRight: 20 }}
              />
            )}
            {item.mediaType == MediaType.Video && (
              <View
                style={{
                  marginRight: 20,
                  width: 40,
                  height: 40,
                  backgroundColor: 'purple',
                  borderRadius: 10,
                }}
              />
            )}
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.author}</Text>
              <Text style={styles.timeStampText}>{item.postedAt()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ContentListScreen;

const styles = StyleSheet.create({
  itemCell: {
    width: '100%',
    height: 76,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  timeStampText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'rgba(0,0,0,0.5)',
  },
});
