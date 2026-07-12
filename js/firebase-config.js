// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3JfmwweJj3FcaPgzfpwxiMJwZm_hX7r8",
  authDomain: "wis-website-82f3d.firebaseapp.com",
  projectId: "wis-website-82f3d",
  storageBucket: "wis-website-82f3d.firebasestorage.app",
  messagingSenderId: "1085696949595",
  appId: "1:1085696949595:web:69c0e2f2e4ee28220dae7e",
  measurementId: "G-KWGLD5Z410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
