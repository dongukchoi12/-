import React from 'react';
import { Text, View } from 'react-native';

export function NoticeBanner({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: '#fde68a', padding: 10, borderRadius: 8, marginBottom: 8 }}>
      <Text style={{ fontSize: 12, color: '#111827' }}>{text}</Text>
    </View>
  );
}
