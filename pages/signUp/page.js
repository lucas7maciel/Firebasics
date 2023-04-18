import { useState, useRef, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { getStorage, ref, uploadString} from "firebase/storage"
import { useNavigate } from "react-router-dom"
import { Step1 } from "./step1"
import { Step2 } from "./step2"
import { Step3 } from "./step3"
import "../../functions/styles.css"
import "./page.css"

const SignUp = () => {
  const [message, setMessage] = useState("Digite aqui os seus dados")
  const [currStep, setCurrStep] = useState(1)
  const [userData, setUserData] = useState({})

  const step1Ref = useRef()
  const step2Ref = useRef()
  const step3Ref = useRef()

  const navigate = useNavigate()

  const steps = {
    1: {
      component: <Step1 setMessage={setMessage} ref={step1Ref} />,
      ref: step1Ref 
    },
    2: {
      component: <Step2 setMessage={setMessage} ref={step2Ref} />,
      ref: step2Ref
    },
    3: {component: <Step3 user={userData} ref={step3Ref} />}
  }

  function next() {
    //comentar
    if (currStep >= Object.keys(steps).length) return

    const step = steps[currStep].component

    //checks if the conditions of the step were satisfied
    //if so, they are added to the userData state and go to the next one
    if (!step.ref?.current.checkConditions()) return

    setUserData(() => {
      return {...userData, ...step.ref?.current.getData()}
    })

    setCurrStep(currStep => currStep + 1)
  }

  function back() {
    if (currStep == 1) navigate("/")
  
    setCurrStep(currStep => currStep - 1)
  }

  return (
    <div className="page">
    <div className="content">
      <h1 className="page-title">CADASTRO</h1>

      {steps[currStep].component}

      <p className="message">{message}</p>

      <div className="button">
        <button type="button" onClick={() => back()}>Voltar</button>
        <button type="button" onClick={() => next()}>Próximo</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp