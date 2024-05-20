import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBOBEE_pHarZ0duQYOKxJ4S86_-tK_dPc0",
  authDomain: "easytix-b4368.firebaseapp.com",
  projectId: "easytix-b4368",
  storageBucket: "easytix-b4368.appspot.com",
  messagingSenderId: "224623304887",
  appId: "1:224623304887:web:e41f299f910225a7bcad32",
  measurementId: "G-VM3SZ79BBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
