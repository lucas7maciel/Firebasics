import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { emailIsValid } from "../../functions/emailIsValid";
import {PasswordInput} from "../../components/passwordInput";
import Logo from "../../assets/logo.png"
import "./page.css"

export const SignIn = () => {
  const [message, setMessage] = useState("Be welcome!")
  const [email, setEmail] = useState("")
  const [passw, setPassw] = useState("")
  const [keepLogged, setKeepLogged] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("keepLogged")) {
      navigate("/profile")
    }
  }, [])

  function login() {
    if (!conditionsOk()) return

    setMessage("Entering...")

    signInWithEmailAndPassword(getAuth(), email, passw)
      .then(() => {
        if (keepLogged) {
          localStorage.setItem("keepLogged", email)
        }

        navigate("/profile")
      })
      .catch((error) => {
        setMessage("Login error:\n" + error.message)
      });
  }

  function conditionsOk() {
    let allOk = false

    if (!email || !passw) {
      setMessage("Empty field")
    } 
    else if (!emailIsValid(email)) {
      setMessage("Invalid email")
    } 
    else {
      allOk = true
    }

    return allOk
  }

  return (
    <div className="page">

    <div className="logo">
      <img src={Logo} alt="Logo" />
    </div>

    <div className="signIn content">
      <div className="form">
        <input
          type="text" 
          placeholder='Login' 
          value={email} 
          onChange={evt => setEmail(evt.target.value)}
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              login()
            }
          }}
        />

        <PasswordInput 
          Value={passw}
          changeValue={setPassw}
          placeHolder="Password" 
          onKeyDown={(evt) => {
            if (evt.key == "Enter") {
              login()
            }
          }}
        />

        <div className="keep-logged">
          <input type="checkbox" name="keepUser" checked={keepLogged} onChange={() => setKeepLogged(!keepLogged)} />
          <label htmlFor="keepUser">Keep me logged</label>
        </div>
      </div>

      <p className="message">{message}</p>
  
      <div className="buttons">
        <button type="button" onClick={() => login()}>Sign In</button>
        <button type="button" onClick={() => navigate("/signUp")}>Sign Up</button><br/>
        <button type="button" onClick={() => navigate("/recoverPasw")}>Forgot Password</button>
      </div>
    </div>
    </div>
  )
}
