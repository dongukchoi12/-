import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export function ScreenContainer({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>{children}</ScrollView>
    </SafeAreaView>
  );
}
