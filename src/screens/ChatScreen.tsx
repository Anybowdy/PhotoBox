import * as firebase from 'firebase';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { uuidv4 } from '../Utils';
import useChat from '../hooks/useChat';

const ChatScreen = () => {
  const { messages } = useChat();
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessageToFirebase = async () => {
    setLoading(true);
    let newItem = {
      id: uuidv4(),
      author: 'You',
      authorId: 102,
      body: currentMessage,
      timestamp: new Date().getTime(),
    };
    let messageRef = firebase.database().ref('messages/').push();
    messageRef.set(newItem);
    setCurrentMessage('');
    setLoading(false);
  };

  const MessageCell = useCallback(
    ({ item }: { item: any }) => (
      <View
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
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
          <Text
            style={{ marginBottom: 10, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}
          >
            Aujourd’hui à 14:34
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: 'white' }}>{item.body}</Text>
          <ActivityIndicator
            animating={loading}
            style={{ width: 20, height: 20, marginLeft: 10 }}
          />
        </View>
      </View>
    ),
    [loading]
  );

  const handleScroll = (event: Object) => {
    let offset = event.nativeEvent.contentOffset.y;
    if (offset > 60) {
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <FlatList
          inverted
          keyboardShouldPersistTaps='always'
          onScroll={handleScroll}
          keyboardDismissMode='none'
          style={{ backgroundColor: 'rgba(0,4,20,0.75)', width: '100%', height: '100%' }}
          keyExtractor={(item) => item.id}
          data={messages}
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
              color: 'white',
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
