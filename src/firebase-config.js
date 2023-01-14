import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJW1KGXCf2RxYfA-zzZnXRR8XpFlR4f5Q",
  authDomain: "e-comm-app-c86a9.firebaseapp.com",
  projectId: "e-comm-app-c86a9",
  storageBucket: "e-comm-app-c86a9.appspot.com",
  messagingSenderId: "258802069818",
  appId: "1:258802069818:web:04c70f76662b5a3fd76003",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
