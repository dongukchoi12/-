export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Checklist: undefined;
  MyPage: undefined;
};

export type AppStackParamList = {
  Tabs: undefined;
  ListingDetail: { listingId: string; ownerId: string };
  ListingForm: { listingId?: string } | undefined;
  Chat: { roomId: string; listingId: string; ownerId: string };
  Report: { targetType: 'listing' | 'user' | 'message'; targetId: string };
};
