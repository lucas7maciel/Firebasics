import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app)

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("Logado")
    const user = userCredential.user;
  })
  .catch((error) => {
    console.log("Erro")
    const errorCode = error.code;
    const errorMessage = error.message;
  });