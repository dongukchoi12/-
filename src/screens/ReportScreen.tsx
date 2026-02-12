import React from 'react';
import { Button, Text, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AppStackParamList } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { auth, db } from '../services/firebase/firebase';

const REASONS = ['spam', 'fraud', 'abuse', 'other'] as const;

export function ReportScreen({ route, navigation }: NativeStackScreenProps<AppStackParamList, 'Report'>) {
  const { targetId, targetType } = route.params;
  const [reason, setReason] = React.useState<(typeof REASONS)[number]>('other');
  const [detailText, setDetailText] = React.useState('');

  const submit = async () => {
    if (!auth.currentUser?.uid) return;
    await addDoc(collection(db, 'reports'), {
      reporterId: auth.currentUser.uid,
      targetType,
      targetId,
      reason,
      detailText,
      createdAt: serverTimestamp(),
      status: 'open',
    });
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text>신고하기 - {targetType}/{targetId}</Text>
      <Text>사유(탭 대신 간단 텍스트 버튼)</Text>
      {REASONS.map((item) => (
        <Button key={item} title={item} onPress={() => setReason(item)} />
      ))}
      <Text>선택된 사유: {reason}</Text>
      <TextInput multiline placeholder="상세 입력" value={detailText} onChangeText={setDetailText} style={{ borderWidth: 1, minHeight: 80, padding: 8 }} />
      <Button title="신고 제출" onPress={submit} />
    </ScreenContainer>
  );
}
