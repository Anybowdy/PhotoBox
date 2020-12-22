import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useItems from '../hooks/useItems';
import ThumbImage from '../components/ThumbImage';

import { getReadableFromTimestamp } from '../Utils';

const ContentListScreen = () => {
  const { items } = useItems();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: 'white' }}
        keyExtractor={(item) => item.id}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemCell}>
            <ThumbImage
              thumbSource={item.thumbURL}
              alternativeSource={item.imageURL}
              style={{ marginRight: 20 }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.author}</Text>
              <Text style={styles.timeStampText}>
                {getReadableFromTimestamp(item.timestamp)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ContentListScreen;

const styles = StyleSheet.create({
  itemCell: {
    width: '100%',
    height: 70,
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
