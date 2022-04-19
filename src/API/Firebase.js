// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBxDPVNZ7DNow4_qhg6Nv9Gi5BsFoR-wik",
  authDomain: "crypto-app-d3b98.firebaseapp.com",
  projectId: "crypto-app-d3b98",
  storageBucket: "crypto-app-d3b98.appspot.com",
  messagingSenderId: "883934053989",
  appId: "1:883934053989:web:d2a90ba2a6bba3c1e3a88c",
  measurementId: "G-JLY4HJL50G"
};
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)