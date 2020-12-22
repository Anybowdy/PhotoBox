import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import useItems from '../hooks/useItems';
import { AntDesign } from '@expo/vector-icons';
import * as firebase from 'firebase';
import ThumbImage from '../components/ThumbImage';

const ContentScreen = () => {
  const { items } = useItems();

  const getReadableFromTimestamp = (timestamp: number) => {
    let now = new Date().getTime();
    var result: number = -1;
    var timeType: string = '';

    let sec = Math.floor((now - timestamp) / 1000);
    let min = Math.floor(sec / 60);
    let hour = Math.floor(min / 60);

    if (sec < 60) {
      result = sec;
      timeType = 'seconde';
    } else if (min < 60) {
      result = min;
      timeType = 'minute';
    } else if (hour < 24) {
      result = hour;
      timeType = 'heure';
    }
    return 'Il y a ' + result + ' ' + timeType + (result > 1 ? 's' : '');
  };

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
