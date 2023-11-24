// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getFirestore
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDqKyAesm4g-gJP_lBy-Gt1vCuGNjGC1pU",
  authDomain: "movieseattacker.firebaseapp.com",
  projectId: "movieseattacker",
  storageBucket: "movieseattacker.appspot.com",
  messagingSenderId: "415433014794",
  appId: "1:415433014794:web:06d9e532872dc8319be9f3",
  measurementId: "G-G0D56H66E4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const auth = getAuth(app);
