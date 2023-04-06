import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { buttonStyle, inputStyle } from "../../functions/stylePatterns";
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
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#5345ED"}}>
    <div style={{position: "relative", backgroundColor: "red"}}>
        <img 
          style={{width: 180, height: 180, borderRadius: 90, border: "solid #FFFFF7", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} 
          src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg"
          alt="Logo" 
        />
    </div>
    <div style={{...mainContainer, ...flexContainer}}>
      <div style={{height: 120}} />
      <form style={{formContainer}}>
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

        <input type="checkbox" name="keepUser" checked={keepLogged} onChange={evt => setKeepLogged(!keepLogged)} />
        <label htmlFor="keepUser">Keep me logged</label>
      </form>

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

const mainContainer = {
  width: 750,
  border: "solid black",
  backgroundColor: "white",
  borderColor: "#FFFFF7",
  borderRadius: 10
}

const flexContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const formContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "start"
}

export default SignIn