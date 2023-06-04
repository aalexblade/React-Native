import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
// } from "@env";

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDMzTRp8BJoXjsRXE5NW3ZeNN7HLwrVNns",
  authDomain: "reactnativeproject-c00fa.firebaseapp.com",
  projectId: "reactnativeproject-c00fa",
  storageBucket: "reactnativeproject-c00fa.appspot.com",
  messagingSenderId: "233339361277",
  measurementId: "G-J21SNMHH1H",
  appId: "1:233339361277:web:0e57a4c0891354292beb94"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);