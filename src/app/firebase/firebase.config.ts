import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBqdtrCEj9umUgT925NDu89HwcvxcRYZ3g',
  authDomain: 'raddit-app.firebaseapp.com',
  projectId: 'raddit-app',
  storageBucket: 'raddit-app.appspot.com',
  messagingSenderId: '265560703457',
  appId: '1:265560703457:web:c101f71c0fae2a800f92a0',
  measurementId: 'G-CNHJQB7GB5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Export the app object
export { app, db };
