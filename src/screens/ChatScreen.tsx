import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const ChatScreen = () => {
  const [items, setItems] = useState([
    {
      message: {
        id: '1',
        author: 'Joseph',
        body: 'Hello how are you',
      },
    },
  ]);

  var MessageCell = ({ item }: { item: any }) => (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-evenly',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{ marginBottom: 10, marginRight: 10, fontWeight: '600', fontSize: 17 }}
        >
          {item.message.author}
        </Text>
        <Text style={{ marginBottom: 10, color: 'rgba(0,0,0,0.5)' }}>
          Aujourd’hui à 14:34
        </Text>
      </View>
      <KeyboardAvoidingView>
        <Text style={{ fontSize: 16 }}>{item.message.body}</Text>
      </KeyboardAvoidingView>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={-20}
    >
      <View
        style={{
          flex: 1,
          //backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlatList
          inverted={true}
          style={{ backgroundColor: 'gray', width: '100%' }}
          keyExtractor={(item) => item.message.id}
          data={items}
          renderItem={({ item, index }) => <MessageCell item={item} />}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 100,
            paddingVertical: 10,
          }}
        >
          <TextInput
            placeholder='Ecrire un message...'
            style={{
              paddingHorizontal: 15,
              width: '95%',
              height: 50,
              borderRadius: 30,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
