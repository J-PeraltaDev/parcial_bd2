// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJNJs-bucP9DW6dyOiwrPMtnqJSEU07BI",
  authDomain: "parcial-bd2.firebaseapp.com",
  projectId: "parcial-bd2",
  storageBucket: "parcial-bd2.firebasestorage.app",
  messagingSenderId: "499041740451",
  appId: "1:499041740451:web:eda7a84d318f28a1794116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;