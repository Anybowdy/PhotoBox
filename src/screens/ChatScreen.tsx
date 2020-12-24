import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableAvoidView from '../components/ScrollableAvoidView';

const ChatScreen = () => {
  const [items, setItems] = useState<any[]>([
    { id: '1', author: 'Joseph', body: 'Hello how are you' },
  ]);

  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  const sendMessage = () => {
    console.log(currentMessage);
    let newItem = {
      id: Math.floor(Math.random() * 100000),
      author: 'You',
      body: currentMessage,
    };
    setItems([newItem, ...items]);
    setCurrentMessage(null);
  };

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
          {item.author}
        </Text>
        <Text style={{ marginBottom: 10, color: 'rgba(0,0,0,0.5)' }}>
          Aujourd’hui à 14:34
        </Text>
      </View>
      <Text style={{ fontSize: 16 }}>{item.body}</Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps='always'
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
          keyExtractor={(item) => item.id}
          data={items}
          renderItem={({ item, index }) => <MessageCell item={item} />}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 100,
            paddingVertical: 10,
            flexDirection: 'row',
          }}
        >
          <TextInput
            placeholder='Ecrire un message...'
            style={{
              paddingHorizontal: 15,
              width: '80%',
              height: 45,
              borderRadius: 30,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            onSubmitEditing={() => console.log('valider')}
            value={currentMessage ? currentMessage : ''}
            onChangeText={(value) => setCurrentMessage(value)}
            //returnKeyType='none'
          />
          <TouchableOpacity onPress={sendMessage}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#45bbf3' }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
