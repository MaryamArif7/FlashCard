import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBomMcKuayQOEL0zhLSF1sXeLfPwWZr_RA",
  authDomain: "flash-card-25e53.firebaseapp.com",
  projectId: "flash-card-25e53",
  storageBucket: "flash-card-25e53.appspot.com",
  messagingSenderId: "775463042925",
  appId: "1:775463042925:web:69f2368d8d665ef2d06464",
  measurementId: "G-3FB03EEJYT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
