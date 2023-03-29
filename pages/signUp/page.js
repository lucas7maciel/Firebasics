import {useEffect, useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";

import {auth} from '../../functions/firebase'
import { useNavigate } from 'react-router-dom';

import StepsContainer from './stepsContainer';

const SignUp = () => {
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

  return (
    <div>
      <h2>Teste dos steps</h2>
      <StepsContainer changeMessage={setMessage} />
      <p>{message}</p>
    </div>
  )
}

export default SignUp