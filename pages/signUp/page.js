import {useState} from 'react'
import StepsContainer from './stepsContainer';

const SignUp = () => {
  const [message, setMessage] = useState("Digite aqui os seus dados")

  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
    <h2>Cadastro</h2>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "solid black"}}>
      <StepsContainer changeMessage={setMessage} />
      <p>{message}</p>
    </div>
    </div>
  )
}

export default SignUp