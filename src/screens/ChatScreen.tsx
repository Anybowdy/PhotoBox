import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const ChatScreen = () => {
  const items = [
    {
      id: '1',
    },
    {
      id: '12',
    },
    {
      id: '13',
    },
    {
      id: '14',
    },
    {
      id: '141',
    },
    {
      id: '142',
    },
    {
      id: '143',
    },
    {
      id: '144',
    },
    {
      id: '145',
    },
    {
      id: '140',
    },
    {
      id: '1400',
    },
    {
      id: '1408',
    },
    {
      id: '14785',
    },
  ];

  var MessageCell = () => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '3%',
        justifyContent: 'space-evenly',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{ marginBottom: 10, marginRight: 10, fontWeight: '600', fontSize: 18 }}
        >
          Joseph
        </Text>
        <Text style={{ marginBottom: 10, color: 'rgba(0,0,0,0.5)' }}>
          Aujourd’hui à 14:34
        </Text>
      </View>
      <Text style={{ fontSize: 18 }}>Hello, how are you</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        inverted={true}
        style={{ backgroundColor: 'gray', width: '100%' }}
        keyExtractor={(item) => item.id}
        data={items}
        renderItem={({ item, index }) => <MessageCell />}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
