import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyC3JfmwweJj3FcaPgzfpwxiMJwZm_hX7r8",
  authDomain: "wis-website-82f3d.firebaseapp.com",
  projectId: "wis-website-82f3d",
  storageBucket: "wis-website-82f3d.firebasestorage.app",
  messagingSenderId: "1085696949595",
  appId: "1:1085696949595:web:69c0e2f2e4ee28220dae7e",
  measurementId: "G-KWGLD5Z410"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const auth = getAuth(app);


export {
    db,
    auth
};
