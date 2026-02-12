import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';

export async function getOrCreateChatRoom(params: {
  listingId: string;
  buyerId: string;
  ownerId: string;
}) {
  const { listingId, buyerId, ownerId } = params;

  const roomsRef = collection(db, 'chatRooms');
  const existingRoomQuery = query(
    roomsRef,
    where('listingId', '==', listingId),
    where('buyerId', '==', buyerId),
    where('ownerId', '==', ownerId),
    limit(1),
  );

  const existing = await getDocs(existingRoomQuery);
  if (!existing.empty) return existing.docs[0].id;

  const created = await addDoc(roomsRef, {
    listingId,
    buyerId,
    ownerId,
    status: 'active',
    createdAt: serverTimestamp(),
    lastMessageText: '',
    lastMessageAt: serverTimestamp(),
  });

  return created.id;
}

export async function sendMessage(roomId: string, senderId: string, text: string) {
  const messageRef = collection(db, `chatRooms/${roomId}/messages`);
  await addDoc(messageRef, {
    senderId,
    text,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, `chatRooms/${roomId}`), {
    lastMessageText: text,
    lastMessageAt: serverTimestamp(),
  });
}
