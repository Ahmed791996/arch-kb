import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace with your actual Firebase config from the Firebase console
// Go to: https://console.firebase.google.com → Project Settings → Your apps → Web app
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "REPLACE_ME",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "REPLACE_ME",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "REPLACE_ME",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "REPLACE_ME",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "REPLACE_ME",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "REPLACE_ME",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
