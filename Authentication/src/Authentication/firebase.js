import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAxvJETGVpxigJXRb3nKc6bZK0R5WbIUss",
  authDomain: "odoo-edc42.firebaseapp.com",
  projectId: "odoo-edc42",
  storageBucket: "odoo-edc42.firebasestorage.app",
  messagingSenderId: "941720190432",
  appId: "1:941720190432:web:72dbe116af86addfbb7f85"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);