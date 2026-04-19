import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCztg2DqJgLvG4odP2oJzUzPvKem0yzQYo",
  authDomain: "usama-2026.firebaseapp.com",
  projectId: "usama-2026",
  storageBucket: "usama-2026.appspot.com",
  messagingSenderId: "258030573225",
  appId: "1:258030573225:web:27eeb5e53ba6b235cffbb8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);