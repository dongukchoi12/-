import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/types';
import { ScreenContainer } from '../components/ScreenContainer';
import { Listing } from '../models/types';

const DUMMY_LISTINGS: Listing[] = [
  {
    id: 'l1',
    ownerId: 'owner-1',
    type: 'rent',
    priceDeposit: 5000,
    priceMonthly: 50,
    title: '홍대입구 도보 5분 원룸',
    description: '채광 좋음',
    addressArea: '마포구',
    photoUrls: [],
    status: 'active',
  },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [search, setSearch] = React.useState('');

  const filtered = DUMMY_LISTINGS.filter((item) =>
    `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScreenContainer>
      <Text>탐색(Home)</Text>
      <TextInput placeholder="검색(제목/설명)" value={search} onChangeText={setSearch} style={{ borderWidth: 1, padding: 8 }} />
      <Text>필터 TODO: type / 가격범위 / addressArea</Text>
      <Button title="매물 등록" onPress={() => navigation.navigate('ListingForm')} />
      {filtered.map((listing) => (
        <View key={listing.id} style={{ borderWidth: 1, borderRadius: 8, padding: 12, gap: 6 }}>
          <Text>{listing.title}</Text>
          <Text>{listing.addressArea}</Text>
          <Button
            title="상세 보기"
            onPress={() => navigation.navigate('ListingDetail', { listingId: listing.id, ownerId: listing.ownerId })}
          />
        </View>
      ))}
    </ScreenContainer>
  );
}
