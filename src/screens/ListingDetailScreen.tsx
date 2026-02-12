import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/types';
import { NoticeBanner } from '../components/NoticeBanner';
import { ScreenContainer } from '../components/ScreenContainer';
import { CONTACT_RESPONSIBILITY_NOTICE, DIRECT_TRANSACTION_NOTICE } from '../constants/legalNotices';
import { auth } from '../services/firebase/firebase';
import { getOrCreateChatRoom } from '../services/firebase/chat';
import { blockUser } from '../services/firebase/users';

export function ListingDetailScreen({ route, navigation }: NativeStackScreenProps<AppStackParamList, 'ListingDetail'>) {
  const { listingId, ownerId } = route.params;

  const onPressContact = async () => {
    const buyerId = auth.currentUser?.uid;
    if (!buyerId) return;
    const roomId = await getOrCreateChatRoom({ listingId, buyerId, ownerId });
    navigation.navigate('Chat', { roomId, listingId, ownerId });
  };

  const onBlockOwner = async () => {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) return;
    await blockUser(currentUserId, ownerId);
  };

  return (
    <ScreenContainer>
      <NoticeBanner text={DIRECT_TRANSACTION_NOTICE} />
      <Text>매물 상세 #{listingId}</Text>
      <View style={{ height: 180, borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
        <Text>사진 캐러셀 TODO</Text>
      </View>
      <Text>TODO: Firestore listings/{'{listingId}'} 상세 표시</Text>
      <Text>{CONTACT_RESPONSIBILITY_NOTICE}</Text>
      <Button title="연락하기" onPress={onPressContact} />
      <Button title="신고하기" onPress={() => navigation.navigate('Report', { targetType: 'listing', targetId: listingId })} />
      <Button title="작성자 차단" onPress={onBlockOwner} />
    </ScreenContainer>
  );
}
