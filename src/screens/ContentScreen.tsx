import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import useItems from '../hooks/useItems';
import ThumbImage from '../components/ThumbImage';

import { getReadableFromTimestamp } from '../Utils';

const ContentScreen = () => {
  const { items } = useItems();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 0,
      }}
    >
      <FlatList
        keyExtractor={(item, index) => item?.id}
        data={items}
        renderItem={(item) => (
          <View
            style={{
              width: '100%',
              height: 70,
              paddingHorizontal: 20,
              marginVertical: 0.2,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <ThumbImage
              thumbSource={item.item.thumbURL}
              alternativeSource={item.item.imageURL}
              style={{ marginRight: 20 }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.item.author}</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '300',
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                {getReadableFromTimestamp(item.item.timestamp)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ContentScreen;

const styles = StyleSheet.create({});
