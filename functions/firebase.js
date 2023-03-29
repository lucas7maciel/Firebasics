import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBlmj9qe_8oZ9gkcPbL-qkjS6M2XEvX1_w",
  authDomain: "notepad-f91f1.firebaseapp.com",
  databaseURL: "https://notepad-f91f1-default-rtdb.firebaseio.com",
  projectId: "notepad-f91f1",
  storageBucket: "notepad-f91f1.appspot.com",
  messagingSenderId: "379731434844",
  appId: "1:379731434844:web:fd1ace3e783443da0cb599",
  measurementId: "G-V5FZL8T98Y"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {auth, storage}
