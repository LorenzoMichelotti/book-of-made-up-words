import '../styles/globals.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDulHa34BZ9HyLZ42vmz6QPeVFFV12fRHM",
  authDomain: "book-of-made-up-words.firebaseapp.com",
  projectId: "book-of-made-up-words",
  storageBucket: "book-of-made-up-words.appspot.com",
  messagingSenderId: "775455711512",
  appId: "1:775455711512:web:850cff1fb9f63efaee7e6d",
  measurementId: "G-VKEH7YCDL7"
};

let analytics; let firestore;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  firestore = getFirestore();
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}  analytics={analytics} firestore={firestore}/>
}

export default MyApp
