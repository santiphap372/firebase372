// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAfELw17sRvFeDuPJg7pLjeAW-LGxCuiGQ",
  authDomain: "lab-fire-24c30.firebaseapp.com",
  projectId: "lab-fire-24c30",
  storageBucket: "lab-fire-24c30.appspot.com",
  messagingSenderId: "559707536378",
  appId: "1:559707536378:web:925ad40610ac360b2ac243",
  measurementId: "G-GVWYWDHZBM"
});
const db = getFirestore(firebaseApp);  
const auth = getAuth(firebaseApp); 
export { db, auth};