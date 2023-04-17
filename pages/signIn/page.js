import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../functions/styles.css"
import "./style.css"
import PasswordInput from "../../components/passwordInput";

const SignIn = () => {
  //input values
  const [loginVal, setLoginVal] = useState("lucas@gmail.com")
  const [paswVal, setPaswVal] = useState("123456")

  const [keepLogged, setKeepLogged] = useState(true)
  const [message, setMessage] = useState("Seja bem vindo")

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("keepLogged")) {
      navigate("/profile")
    }
  }, [])

  function login() {
    if (loginVal == "" || paswVal == "") {
      return setMessage("Campo vazio")
    } else if (!emailIsValid) {
      return setMessage("Digite um email válido")
    }

    signInWithEmailAndPassword(getAuth(), loginVal, paswVal)
    .then(() => {
      setMessage("User logado")

      if (keepLogged) {
        localStorage.setItem("keepLogged", loginVal)
      }

      navigate("/profile")
    })
    .catch((error) => {
      setMessage("Erro ao logar")

      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  function emailIsValid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginVal)) {
      return true
    }

    return false
  }

  return (
    <div className="page">
    <div className="logo">
      <img src="https://pic.onlinewebfonts.com/svg/img_337183.png" alt="Logo" />
    </div>
    <div className="content">
      <div style={{height: 120}} />
      <div className="form">
        <input
          type="text" 
          placeholder='Login' 
          value={loginVal} 
          onChange={evt => setLoginVal(evt.target.value)}
        />

        <div style={{height: 13}} />

        <PasswordInput 
          Value={paswVal}
          changeValue={setPaswVal}
          placeHolder="Senha"
        />

        <div style={{height: 7}} />

        <div className="checkbox">
          <input type="checkbox" name="keepUser" checked={keepLogged} onChange={() => setKeepLogged(!keepLogged)} />
          <label htmlFor="keepUser">Keep me logged</label>
        </div>
      </div>

      <p className="message">{message}</p>
  
      <div className="buttons">
        <button 
          type="button"
          onClick={() => login()}
        >Entrar</button>
        <div style={{height: 10}} />
        <button type="button" onClick={() => navigate("/signUp")}>Cadastrar</button>
        <div style={{height: 15}} />
        <button type="button" onClick={() => navigate("/recoverPasw")}>Esqueci a senha</button>
      </div>

      <div style={{height: 13}} />
    </div>
    </div>
  )
}

export default SignIn