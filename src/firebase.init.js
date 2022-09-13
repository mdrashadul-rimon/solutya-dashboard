// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9a5ZwssHEBkMrc4wEaF-NKQLBjVeG3Ao",
  authDomain: "solutya-dashboard.firebaseapp.com",
  projectId: "solutya-dashboard",
  storageBucket: "solutya-dashboard.appspot.com",
  messagingSenderId: "25991101657",
  appId: "1:25991101657:web:2e95f2ff12eb9772f4d2c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;