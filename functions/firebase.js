import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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

function Login() {
  console.log("Começou")
  signInWithEmailAndPassword(auth, "Lucas@gmail.com", "123456")
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Logado")
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Erro: ${errorMessage}`)
  });
  console.log("Acabou")
}

export {Login, auth}
