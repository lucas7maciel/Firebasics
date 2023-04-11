import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { pageStyle, containerStyle, buttonStyle, inputStyle } from "../../functions/stylePatterns";
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
    <div style={pageStyle}>
    <div style={{position: "relative", backgroundColor: "red"}}>
        <img 
          style={{width: 180, height: 180, borderRadius: 90, border: "solid #FFFFF7", backgroundColor: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} 
          src="https://pic.onlinewebfonts.com/svg/img_337183.png"
          alt="Logo" 
        />
    </div>
    <div style={{...containerStyle, ...flexContainer}}>
      <div style={{height: 120}} />
      <div style={formContainer}>
        <input
          style={inputStyle} 
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

        <div style={{display: "flex"}}>
          <input type="checkbox" name="keepUser" checked={keepLogged} onChange={() => setKeepLogged(!keepLogged)} />
          <label htmlFor="keepUser">Keep me logged</label>
        </div>
      </div>

      <p>{message}</p>
  
      <div style={flexContainer}>
        <button 
          style={buttonStyle}
          type="button"
          onClick={() => login()}
        >Entrar</button>
        <div style={{height: 10}} />
        <button style={buttonStyle} type="button" onClick={() => navigate("/signUp")}>Cadastrar</button>
        <div style={{height: 15}} />
        <button type="button" style={buttonStyle} onClick={() => navigate("/recoverPasw")}>Esqueci a senha</button>
      </div>

      <div style={{height: 13}} />
    </div>
    </div>
  )
}

const flexContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const formContainer = {
  width: 300,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent:"center"
}

export default SignIn