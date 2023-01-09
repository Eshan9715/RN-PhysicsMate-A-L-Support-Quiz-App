import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore/lite"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC7OHh_5hjiRTQGrFQL4WUoeBlEdC6WgOY",
  authDomain: "physicsmate-d06ea.firebaseapp.com",
  projectId: "physicsmate-d06ea",
  storageBucket: "physicsmate-d06ea.appspot.com",
  messagingSenderId: "3423104470",
  appId: "1:3423104470:web:68feb3a4ae062b34158877"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
