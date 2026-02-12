import React from 'react';
import { Button, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase/firebase';
import { ScreenContainer } from '../components/ScreenContainer';

export function MyPageScreen() {
  return (
    <ScreenContainer>
      <Text>마이페이지</Text>
      <Text>내 매물 / 설정 / 차단목록 / 고지/약관</Text>
      <Text>TODO: blockedUserIds 관리 UI 연결</Text>
      <Button title="로그아웃" onPress={() => signOut(auth)} />
    </ScreenContainer>
  );
}
