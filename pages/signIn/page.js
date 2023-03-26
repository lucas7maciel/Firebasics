import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

const SignIn = () => {
  //input values
  const [loginVal, setLoginVal] = useState("lucas@gmail.com")
  const [paswVal, setPaswVal] = useState("123456")

  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  function updateInput(event, changeState) {
    const newValue = event.target.value
    changeState(newValue)
  }

  function login() {
    if (loginVal == "" || paswVal == "") {
      return setMessage("Campo vazio")
    }

    signInWithEmailAndPassword(getAuth(), loginVal, paswVal)
    .then((userCredential) => {
      setMessage("User logado")

      const user = userCredential.user;
      navigate("/profile")
    })
    .catch((error) => {
      setMessage("Erro ao logar")

      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  return (
    <div style={{textAlign: 'center', position: 'absolute', top:0,bottom:0, left:0, right:0}}>
      <img style={{maxHeight: 175}} src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" alt="Logo"></img>

      <form>
        <input type="text" placeholder='Login' value={loginVal} onChange={evt => updateInput(evt, setLoginVal)}></input><br></br>
        <input type="text" placeholder='Senha' value={paswVal} onChange={evt => updateInput(evt, setPaswVal)}></input><br></br>
        <input type="checkbox" name="keepUser"></input>
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