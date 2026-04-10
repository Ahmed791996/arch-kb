import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "AIzaSyBdfXQEQv75FxeR2dv2XqY9-CSvl5pBlcY",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "pathkit-site.firebaseapp.com",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "pathkit-site",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "pathkit-site.firebasestorage.app",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "539398934046",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:539398934046:web:88446a6ff59d845609e80f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
