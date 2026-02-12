import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthNavigator } from './AuthNavigator';
import { AppStackNavigator } from './AppStackNavigator';
import { useAuthState } from '../utils/useAuthState';

export function RootNavigator() {
  const { initializing, user } = useAuthState();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return user ? <AppStackNavigator /> : <AuthNavigator />;
}
