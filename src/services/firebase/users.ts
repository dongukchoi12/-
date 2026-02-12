import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function blockUser(currentUserId: string, targetUserId: string) {
  await updateDoc(doc(db, `users/${currentUserId}`), {
    blockedUserIds: arrayUnion(targetUserId),
  });
}

export async function getBlockedUserIds(currentUserId: string): Promise<string[]> {
  const snap = await getDoc(doc(db, `users/${currentUserId}`));
  return (snap.data()?.blockedUserIds as string[] | undefined) ?? [];
}
