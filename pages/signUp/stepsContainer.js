
import { useState, useRef, useEffect } from "react"
import { getAuth, updateProfile,createUserWithEmailAndPassword } from "firebase/auth"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const StepsContainer = props => {
  const step1Ref = useRef()
  const step2Ref = useRef()

  const [currStep, setCurrStep] = useState(0)
  const [userData, setUserData] = useState({})

  const steps = [
    <Step1 ref={step1Ref} />,
    <Step2 ref={step2Ref} />,
    <Step3 />
  ]

  useEffect(() => {
    if (currStep === steps.length - 1) {
      createUser()
    }
  }, [userData])

  function next() {
    if (currStep >= 2) return

    if (currStep == 0 && step1Ref) {
      if (step1Ref.current.verify()) {
        const stepData = step1Ref.current.getData()

        setUserData({...userData, ...stepData})
        setCurrStep(currStep + 1)
      }
    }

    if (currStep == 1 && step2Ref) {
      if (step2Ref.current.verify()) {
        const stepData = step2Ref.current.getData()

        setUserData(userData => { return {...userData, ...stepData}})
        setCurrStep(currStep => currStep + 1)
      }
    }
  }

  function createUser() {
    createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
    .then(userCredential => {
      props.changeMessage("Usuário criado, atualizando dados")
      updateData(userCredential.user)
    })
    .catch((error) => {
      props.changeMessage("Erro ao criar usuário")

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  function updateData(user) {
    updateProfile(user, {displayName: userData.displayName, photoURL: ""})
    .then(() => {
      console.log("Só sucesso meu patrão")
    })
    .catch(error => {
      console.log("Só erro meu patrão")
      console.log(error.message)
    })
  }

  return (
    <div>
      {steps[currStep]}
      <div>
        <button type="button">Voltar</button>
        <button type="button" onClick={() => next()}>Próximo</button>
      </div>
    </div>
  )
}

export default StepsContainer