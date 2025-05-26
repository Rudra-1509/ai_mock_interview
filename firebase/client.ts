import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBxjjt04VSo8liZZqjegQp77x4MVGE5UoA",
  authDomain: "prepwise-14b5e.firebaseapp.com",
  projectId: "prepwise-14b5e",
  storageBucket: "prepwise-14b5e.firebasestorage.app",
  messagingSenderId: "306315801722",
  appId: "1:306315801722:web:4dee72a3d3633c5f0477c3",
  measurementId: "G-40CT91VR77",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
