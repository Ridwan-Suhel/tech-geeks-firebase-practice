// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBunBEm_C7Bp0sYTGNnbguULNWG4um5kWY",
  authDomain: "tech-geeks-dfe4a.firebaseapp.com",
  projectId: "tech-geeks-dfe4a",
  storageBucket: "tech-geeks-dfe4a.appspot.com",
  messagingSenderId: "411442534548",
  appId: "1:411442534548:web:04560e039ca1545188bc81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
