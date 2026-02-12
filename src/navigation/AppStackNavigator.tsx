import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTabsNavigator } from './AppTabsNavigator';
import { ListingDetailScreen } from '../screens/ListingDetailScreen';
import { ListingFormScreen } from '../screens/ListingFormScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={AppTabsNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ title: '매물 상세' }} />
      <Stack.Screen name="ListingForm" component={ListingFormScreen} options={{ title: '매물 등록/수정' }} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}
