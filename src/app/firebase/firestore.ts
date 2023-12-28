import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { SubredditTypeDB } from '../models/subraddit.model';

export async function createData(tableName, data) {
  try {
    const collectionRef = collection(db, tableName);
    const createdData = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return createdData;
  } catch (error) {
    console.error(`Error creating ${tableName} data:`, error);
    return error;
  }
}

export async function getAllData(tableName: string) {
  try {
    const collectionRef = collection(db, tableName);
    const q = query(collectionRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as SubredditTypeDB;

      return {
        [`${tableName}Id`]: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toMillis()
            : data.createdAt,
      };
    });
  } catch (error) {
    console.error(`Error getting all ${tableName}:`, error);
    throw error;
  }
}
