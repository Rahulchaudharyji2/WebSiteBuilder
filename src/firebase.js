// Firebase setup
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJFtk4tMBGjEHVzfg4xmJEeqMJ9cPEG5k",
  authDomain: "websitebuilder-e9b19.firebaseapp.com",
  projectId: "websitebuilder-e9b19",
  storageBucket: "websitebuilder-e9b19.firebasestorage.app",
  messagingSenderId: "452473196176",
  appId: "1:452473196176:web:48dba88d81f75cddffd215",
  measurementId: "G-L3VXSV05DJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
