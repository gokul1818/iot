// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyD55-Y7Neu7cII77cSz2Wr5NnBAJNTssCI",
    authDomain: "esp-test-71219.firebaseapp.com",
    databaseURL: "https://esp-test-71219-default-rtdb.firebaseio.com",
    projectId: "esp-test-71219",
    storageBucket: "esp-test-71219.appspot.com",
    messagingSenderId: "776839629556",
    appId: "1:776839629556:web:cb302f3938673fd739aca1",
    measurementId: "G-N0H6K07092"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Initialize Realtime Database

export { app, db }; // Export both app and db
