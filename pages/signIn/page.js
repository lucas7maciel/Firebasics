import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import PasswordInput from "../../components/passwordInput";

const SignIn = () => {
  //input values
  const [loginVal, setLoginVal] = useState("lucas@gmail.com")
  const [paswVal, setPaswVal] = useState("123456")

  const [keepLogged, setKeepLogged] = useState(true)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("keepLogged")) {
      navigate("/profile")
    }
  }, [])

  function updateInput(event, changeState) {
    const newValue = event.target.value
    changeState(newValue)
  }

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
    <div style={{textAlign: 'center', position: 'absolute', top:0,bottom:0, left:0, right:0}}>
      <img style={{maxHeight: 175}} src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" alt="Logo"></img>

      <form>
        <input 
        type="text" 
        placeholder='Login' 
        value={loginVal} 
        onChange={evt => updateInput(evt, setLoginVal)}
        /> <br></br>
        <input type="text" placeholder='Senha' value={paswVal} onChange={evt => updateInput(evt, setPaswVal)}></input><br></br>
        <PasswordInput />
        <input type="checkbox" name="keepUser" checked={keepLogged} onChange={evt => setKeepLogged(!keepLogged)}></input>
        <label htmlFor="keepUser">Keep me logged</label>
      </form>

      <p>{message}</p>
  
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', marginTop: 50}}>
        <button type="button" onClick={() => login()}>Entrar</button>
        <button type="button" onClick={() => navigate("/recoverPasw")}>Esqueci a senha</button>
        <button type="button" onClick={() => navigate("/signUp")}>Cadastrar</button>
      </div>
    </div>
  )
}

export default SignIn