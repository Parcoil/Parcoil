import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc,getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyABFTePIUCzlSbZWLuYpPyvqIJgn5uQBpU",
  authDomain: "parcoil.firebaseapp.com",
  projectId: "parcoil",
  storageBucket: "parcoil.appspot.com",
  messagingSenderId: "620906474969",
  appId: "1:620906474969:web:6e11c631d03e253fd8fdc8",
  measurementId: "G-FQ8PQ7DD0P"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();



export {auth,provider,firebaseConfig}
