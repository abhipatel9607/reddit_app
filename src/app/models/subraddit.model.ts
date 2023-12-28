import { Timestamp } from 'firebase/firestore';

export interface SubredditType {
  name: string;
  userId: string;
  createdAt: number;
  subredditId: string;
}

export interface SubredditTypeDB {
  name: string;
  userId: string;
  createdAt: Timestamp;
  subredditId: string;
}
