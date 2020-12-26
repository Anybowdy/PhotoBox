import * as firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { uuidv4 } from '../Utils';

const ChatScreen = () => {
  const [items, setItems] = useState<any[]>([
    { id: '1', author: 'Joseph', authorId: 5, body: 'Hello how are you' },
    { id: '2', author: 'Joseph', authorId: 5, body: 'Je vais bien' },
    { id: '23', author: 'Joseph', authorId: 5, body: 'et toi' },
    { id: '29', author: 'AZIZ', authorId: 7, body: 'lolmfti' },
    { id: '2933', author: 'AZIZ', authorId: 7, body: 'g faim' },
    { id: '22', author: 'Joseph', authorId: 5, body: 'Je parle solo' },
  ]);

  const [currentMessage, setCurrentMessage] = useState('');

  const transformMessage = () => {
    const result: Object[] = [];
    for (var i = 0; i < items.length; i++) {
      let currentMsg = items[i];
      for (var j = i + 1; j < items.length; j++) {
        let comparedMessage = items[j];
        // same author two msg
        if (comparedMessage.authorId == currentMsg.authorId) {
          currentMsg.body = currentMsg.body + '\n' + comparedMessage.body;
          i++, j++;
        } else {
          break;
        }
      }
      result.push(currentMsg);
    }
    setItems(result);
  };

  useEffect(() => {
    //transformMessage();
  }, []);

  const sendMessage = () => {
    const lastMsg = items[0];
    const it = items;
    if (lastMsg.authorId == 5) {
      it.shift();
      setItems([{ ...lastMsg, body: lastMsg.body + '\n' + currentMessage }, ...it]);
    } else {
      let newItem = {
        id: uuidv4(),
        author: 'You',
        authorId: 102,
        body: currentMessage,
      };
      setItems([newItem, ...items]);
    }
  };

  const sendMessageToFirebase = async () => {
    let newItem = {
      id: uuidv4(),
      author: 'You',
      authorId: 102,
      body: currentMessage,
    };
    let messageRef = firebase.database().ref('messages/').push();
    messageRef.set(newItem);

    setCurrentMessage('');
  };

  var MessageCell = ({ item }: { item: any }) => (
    <View
      style={{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-evenly',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            marginBottom: 10,
            marginRight: 15,
            fontWeight: '600',
            fontSize: 17,
            color: 'white',
          }}
        >
          {item.author}
        </Text>
        <Text style={{ marginBottom: 10, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          Aujourd’hui à 14:34
        </Text>
      </View>
      <Text style={{ fontSize: 16, color: 'white' }}>{item.body}</Text>
    </View>
  );

  const handleScroll = (event: Object) => {
    let offset = event.nativeEvent.contentOffset.y;
    if (offset > 45) {
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View
        style={{
          flex: 1,
          //backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <FlatList
          inverted
          keyboardShouldPersistTaps='handled'
          onScroll={handleScroll}
          keyboardDismissMode='none'
          style={{ backgroundColor: 'rgba(0,4,20,0.75)', width: '100%' }}
          keyExtractor={(item) => item.id}
          data={items}
          renderItem={({ item }) => <MessageCell item={item} />}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 100,
            paddingVertical: 10,
            flexDirection: 'row',
            backgroundColor: 'rgba(0,4,20,0.75)',
            borderTopWidth: 1.5,
            borderTopColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <TextInput
            placeholder='Ecrire un message...'
            placeholderTextColor='white'
            style={{
              paddingHorizontal: 15,
              width: '80%',
              height: 45,
              borderRadius: 30,
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            onSubmitEditing={() => console.log('valider')}
            value={currentMessage}
            onChangeText={(value) => {
              setCurrentMessage(value);
            }}
          />
          <TouchableOpacity onPress={sendMessageToFirebase}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#45bbf3' }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
