// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add your own Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyAkAGmegN2t6_gKNK5pTB4eZZYwFFZvID4",
  authDomain: "hotstar-27a9d.firebaseapp.com",
  projectId: "hotstar-27a9d",
  storageBucket: "hotstar-27a9d.firebasestorage.app",
  messagingSenderId: "304216633240",
  appId: "1:304216633240:web:b6505f6fb2f8ba2c1e45ed",
  measurementId: "G-NZ7EZVGY6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);





// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }