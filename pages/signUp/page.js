import {useState} from 'react'
import StepsContainer from './stepsContainer';
import { pageStyle, containerStyle } from '../../functions/stylePatterns';

const SignUp = () => {
  const [message, setMessage] = useState("Digite aqui os seus dados")

  return (
    <div style={pageStyle}>
    <h2 style={{color: "white", fontWeight: "bold"}}>CADASTRO</h2>
    <div style={containerStyle}>
      <StepsContainer changeMessage={setMessage} />
      <p style={{textAlign: "center"}}>{message}</p>
    </div>
    </div>
  )
}

export default SignUp