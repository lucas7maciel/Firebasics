import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { emailIsValid } from "../../functions/emailIsValid";
import {PasswordInput} from "../../components/passwordInput";
import "../../functions/styles.css"
import "./page.css"

export const SignIn = () => {
  const [message, setMessage] = useState("Seja bem vindo")
  const [email, setEmail] = useState("lucasmacielcontato@gmail.com")
  const [passw, setPassw] = useState("123123")
  const [keepLogged, setKeepLogged] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("keepLogged")) {
      navigate("/profile")
    }
  }, [])

  function login() {
    if (!conditionsOk()) return

    signInWithEmailAndPassword(getAuth(), email, passw)
      .then(() => {
        if (keepLogged) {
          localStorage.setItem("keepLogged", email)
        }

        navigate("/profile")
      })
      .catch((error) => {
        setMessage("Erro ao logar")
      });
  }

  function conditionsOk() {
    let allOk = false

    if (!email || !passw) {
      setMessage("Campo vazio")
    } 
    else if (!emailIsValid(email)) {
      setMessage("Digite um email válido")
    } 
    else {
      allOk = true
    }

    return allOk
  }

  return (
    <div className="page">

    <div className="logo">
      <img src="https://pic.onlinewebfonts.com/svg/img_337183.png" alt="Logo" />
    </div>

    <div className="content">
      <div className="form">
        <input
          type="text" 
          placeholder='Login' 
          value={email} 
          onChange={evt => setEmail(evt.target.value)}
        />

        <PasswordInput 
          Value={passw}
          changeValue={setPassw}
          placeHolder="Senha"
        />

        <div className="keep-logged">
          <input type="checkbox" name="keepUser" checked={keepLogged} onChange={() => setKeepLogged(!keepLogged)} />
          <label htmlFor="keepUser">Keep me logged</label>
        </div>
      </div>

      <p className="message">{message}</p>
  
      <div className="buttons">
        <button type="button" onClick={() => login()}>Entrar</button>
        <button type="button" onClick={() => navigate("/signUp")}>Cadastrar</button>
        <button type="button" onClick={() => navigate("/recoverPasw")}>Esqueci a senha</button>
      </div>
    </div>
    </div>
  )
}
