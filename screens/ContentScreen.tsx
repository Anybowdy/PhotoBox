import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import * as firebase from 'firebase';
import useItems from '../hooks/useItems';

const ContentScreen = () => {
  const { items } = useItems();

  const convert = (timeStamp: number) => {
    let now = new Date().getTime();
    let sec = Math.floor((now - timeStamp) / 1000);
    if (sec < 60) {
      return sec + ' secondes';
    }

    let min = Math.floor(sec / 60);
    if (min < 60) {
      return min + ' minutes';
    }

    let hour = Math.floor(min / 60);
    return hour + ' heures';
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(200,100,200,0.1)',
        paddingVertical: 0,
        //justifyContent: 'center',
        //alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 100,
          backgroundColor: 'white',
          alignItems: 'center',
        }}
      >
        <Text
          style={{ fontSize: 20, fontWeight: '600', bottom: 20, position: 'absolute' }}
        >
          Photos
        </Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => item?.id}
        data={items.reverse()}
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
            <Image
              source={{ uri: item.item.imageURL }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                marginRight: 20,
                borderRadius: 10,
              }}
            />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 18, fontWeight: '400' }}>{item.item.email}</Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '300',
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                Il y a {convert(item.item.timestamp)}
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
