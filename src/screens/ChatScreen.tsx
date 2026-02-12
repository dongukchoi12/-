import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AppStackParamList } from '../navigation/types';
import { NoticeBanner } from '../components/NoticeBanner';
import { ScreenContainer } from '../components/ScreenContainer';
import { DIRECT_TRANSACTION_NOTICE } from '../constants/legalNotices';
import { auth, db } from '../services/firebase/firebase';
import { sendMessage } from '../services/firebase/chat';
import { getBlockedUserIds } from '../services/firebase/users';

type Message = { id: string; senderId: string; text: string };

export function ChatScreen({ route }: NativeStackScreenProps<AppStackParamList, 'Chat'>) {
  const { roomId } = route.params;
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [blockedUserIds, setBlockedUserIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    const q = query(collection(db, `chatRooms/${roomId}/messages`), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const next = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        senderId: docSnap.get('senderId') as string,
        text: docSnap.get('text') as string,
      }));
      setMessages(next);
    });
    return unsubscribe;
  }, [roomId]);


  React.useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) return;
    getBlockedUserIds(currentUserId).then(setBlockedUserIds);
  }, []);

  const onSend = async () => {
    if (!text.trim() || !auth.currentUser?.uid) return;
    await sendMessage(roomId, auth.currentUser.uid, text);
    setText('');
    // TODO: room lastMessage update
  };

  return (
    <ScreenContainer>
      <NoticeBanner text={DIRECT_TRANSACTION_NOTICE} />
      <Text>채팅방: {roomId}</Text>
      {messages.filter((message) => !blockedUserIds.includes(message.senderId)).map((message) => (
        <View key={message.id} style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}>
          <Text>{message.senderId}</Text>
          <Text>{message.text}</Text>
        </View>
      ))}
      <TextInput value={text} onChangeText={setText} placeholder="메시지" style={{ borderWidth: 1, padding: 8 }} />
      <Button title="전송" onPress={onSend} />
      <Text>차단 유저 메시지는 클라이언트에서 최소 노출 처리됩니다.</Text>
    </ScreenContainer>
  );
}
