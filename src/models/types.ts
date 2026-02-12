export type UserRole = 'user' | 'host' | 'admin';
export type ListingType = 'rent' | 'sale';

export interface AppUser {
  id: string;
  nickname: string;
  role: UserRole;
  status: 'active' | 'blocked';
  blockedUserIds: string[];
}

export interface Listing {
  id: string;
  ownerId: string;
  type: ListingType;
  priceDeposit?: number;
  priceMonthly?: number;
  priceSale?: number;
  title: string;
  description: string;
  addressArea: string;
  photoUrls: string[];
  status: 'active' | 'hidden' | 'sold';
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ChatRoom {
  id: string;
  listingId: string;
  buyerId: string;
  ownerId: string;
  status: 'active' | 'closed';
  lastMessageText?: string;
  lastMessageAt?: unknown;
}
