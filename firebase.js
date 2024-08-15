// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBomMcKuayQOEL0zhLSF1sXeLfPwWZr_RA",
  authDomain: "flash-card-25e53.firebaseapp.com",
  projectId: "flash-card-25e53",
  storageBucket: "flash-card-25e53.appspot.com",
  messagingSenderId: "775463042925",
  appId: "1:775463042925:web:69f2368d8d665ef2d06464",
  measurementId: "G-3FB03EEJYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirebase(app);