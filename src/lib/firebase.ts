
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1YGFbDHDuSQVXFsRO-XD7Usir9dULoEU",
  authDomain: "testing-dba79.firebaseapp.com",
  projectId: "testing-dba79",
  storageBucket: "testing-dba79.firebasestorage.app",
  messagingSenderId: "808371260131",
  appId: "1:808371260131:web:a59f409f532e617cba13d6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// This is a frontend-only Firebase configuration using a publishable key
// In production, you might want to use environment variables
