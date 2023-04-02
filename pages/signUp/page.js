import {useState} from 'react'
import StepsContainer from './stepsContainer';

const SignUp = () => {
  const [message, setMessage] = useState("Digite aqui os seus dados")

  return (
    <div>
      <h2>Teste dos steps</h2>
      <StepsContainer changeMessage={setMessage} />
      <p>{message}</p>
    </div>
  )
}

export default SignUp