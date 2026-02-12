import React from 'react';
import { Text } from 'react-native';
import { ScreenContainer } from '../components/ScreenContainer';

export function FavoritesScreen() {
  return (
    <ScreenContainer>
      <Text>찜 목록</Text>
      <Text>TODO: users/{'{userId}'}/favorites 연동</Text>
    </ScreenContainer>
  );
}
