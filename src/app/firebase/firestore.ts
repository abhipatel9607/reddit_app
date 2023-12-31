import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { app, db } from './firebase.config';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { SubredditTypeDB } from '../models/subraddit.model';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export async function createData(tableName: string, data: object) {
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

export async function uploadImage(file: any) {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'images/' + file.name);
  const metadata = {
    contentType: 'image/jpeg',
  };
  try {
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File Uploaded: URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file', error);
    throw error;
  }
}

export async function findById(tableName: string, tableId: string) {
  try {
    const docRef = doc(collection(db, tableName), tableId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error finding ${tableName} by ID:`, error);
    throw error;
  }
}

export async function updateData(
  tableName: string,
  tableId: string,
  dataToBeUpdate: any
) {
  try {
    console.log('kooooo', tableName, tableId, dataToBeUpdate);
    const docRef = doc(db, tableName, tableId);
    const updatedData = await updateDoc(docRef, {
      ...dataToBeUpdate,
      editedAt: serverTimestamp(),
    });
    return updatedData;
  } catch (error) {
    console.error(`Error updating ${tableName} document:`, error);
    throw error;
  }
}
