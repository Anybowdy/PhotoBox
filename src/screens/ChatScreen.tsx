import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScrollableAvoidView from '../components/ScrollableAvoidView';

const ChatScreen = () => {
  const [items, setItems] = useState<any[]>([
    { id: '1', author: 'Joseph', authorId: 5, body: 'Hello how are you' },
    { id: '2', author: 'Joseph', authorId: 5, body: 'Je vais bien' },
    { id: '23', author: 'Joseph', authorId: 5, body: 'et toi' },
    { id: '29', author: 'AZIZ', authorId: 7, body: 'lolmfti' },
    { id: '2933', author: 'AZIZ', authorId: 7, body: 'g faim' },
    { id: '22', author: 'Joseph', authorId: 5, body: 'Je parle solo' },
  ]);

  const transformMessage = () => {
    const result: Object[] = [];
    for (var i = 0; i < items.length; i++) {
      let currentMsg = items[i];
      for (var j = i + 1; j < items.length; j++) {
        let comparedMessage = items[j];
        // same author two msg
        if (comparedMessage.authorId == currentMsg.authorId) {
          currentMsg.body = currentMsg.body + '\n' + comparedMessage.body;
          i++;
          j++;
        } else {
          break;
        }
      }
      result.push(currentMsg);
    }
    setItems(result);
  };

  useEffect(() => {
    transformMessage();
  }, []);

  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  const sendMessage = () => {
    // console.log(currentMessage);
    // let newItem = {
    //   id: Math.floor(Math.random() * 100000).toString(),
    //   author: 'You',
    //   authorId: 5,
    //   body: currentMessage,
    // };
    // setItems([newItem, ...items]);
    console.log(items[0]);
    const lastMsg = items[0];
    const it = items;
    if (lastMsg.authorId == 5) {
      it.shift();
      setItems([{ ...lastMsg, body: lastMsg.body + '\n' + currentMessage }, ...it]);
    }
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

  const handleScroll = (event: Object) => {
    let offset = event.nativeEvent.contentOffset.y;
    //console.log(event.nativeEvent);
    //console.log(offset);
    if (offset > 60) {
      Keyboard.dismiss();
    }
  };

  return (
    // <ScrollView
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   keyboardShouldPersistTaps='always'
    //   keyboardDismissMode='on-drag'
    // >
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
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
          keyboardShouldPersistTaps='handled'
          onScroll={handleScroll}
          keyboardDismissMode='none'
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
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
