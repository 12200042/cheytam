import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "cheytam-10d85.firebaseapp.com",
    projectId: "cheytam-10d85",
    storageBucket: "cheytam-10d85.appspot.com",
    messagingSenderId: "520907284364",
    appId: "1:520907284364:web:203cecf6936ea3049bc0a9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);