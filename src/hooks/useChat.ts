import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

const useChat = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const transformMessage = () => {
    const result: Object[] = [];
    for (var i = 0; i < messages.length; i++) {
      let currentMsg = messages[i];
      for (var j = i + 1; j < messages.length; j++) {
        let comparedMessage = messages[j];
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
    //setItems(result);
  };

  useEffect(() => {
    //transformMessage();
    setMessages([]);
    const ref = firebase.database().ref().child('messages/');
    const sub = ref.on('child_added', (snapshot) => {
      console.log(snapshot.val());
      setMessages((old) => [snapshot.val(), ...old]);
    });
    return () => {
      ref.off('child_added', sub);
    };
  }, []);

  return { messages };
};

export default useChat;
