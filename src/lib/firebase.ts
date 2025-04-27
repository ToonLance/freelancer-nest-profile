
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9xMWyhvq9gTgxNwgM9jHy8Zx1mbTIuwY",
  authDomain: "freelancer-nest-profile.firebaseapp.com",
  projectId: "freelancer-nest-profile",
  storageBucket: "freelancer-nest-profile.appspot.com",
  messagingSenderId: "810786224985",
  appId: "1:810786224985:web:38143bbf40bb83efb5e5fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// This is a frontend-only Firebase configuration using a publishable key
// In production, you might want to use environment variables
