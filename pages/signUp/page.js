import {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";

import {auth} from '../../functions/firebase'
import { useNavigate } from 'react-router-dom';

import StepsContainer from './stepsContainer';

const SignUp = () => {
  //input value states
  const [emailVal, setEmailVal] = useState("")
  const [paswVal, setPaswVal] = useState("")
  const [confPaswVal, setConfPaswVal] = useState("")

  const [currStep, setCurrStep] = useState(0)
  const [message, setMessage] = useState("Digite aqui os seus dados")

  const navigate = useNavigate()

  function updateInput(event, changeState) {
    const newValue = event.target.value
    changeState(newValue)
  }

  function signUp() {
    if (paswVal != confPaswVal) {
      return setMessage("Senhas não conferem")
    } else if (!emailIsValid(emailVal)) {
      return setMessage("Email inválido")
    }

    createUserWithEmailAndPassword(auth, emailVal, paswVal)
    .then((userCredential) => {
      setMessage("Usuário criado com sucesso")

      const user = userCredential.user;
    })
    .catch((error) => {
      setMessage("Erro ao criar usuário")

      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage)
    });

  }

  function emailIsValid(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }

    return false
  }

  return (
    <div style={{margin: "0 auto"}}>
    <div style={{marginLeft: 50, textAlign: 'center'}}>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder='Login' value={emailVal} onChange={evt => updateInput(evt, setEmailVal)}></input><br></br>
        <input type="text" placeholder='Senha' value={paswVal} onChange={evt => updateInput(evt, setPaswVal)}></input><br></br>
        <input type="text" placeholder='Confirmar senha' value={confPaswVal} onChange={evt => updateInput(evt, setConfPaswVal)}></input>
      </form>
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <button type="button" onClick={() => signUp()}>Cadastrar</button>
        <button type="button" onClick={() => navigate("/")}>Voltar</button>
        <p>{message}</p>
      </div>

      <h2>Teste dos steps</h2>
      <StepsContainer currStep={currStep} />
      <button type="button" onClick={() => setCurrStep(currStep - 1)}>Voltar</button>
      <button type="button" onClick={() => setCurrStep(currStep + 1)}>Next</button>
    </div>
    </div>
  )
}

export default SignUp