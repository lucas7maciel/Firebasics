
import { useState, useRef } from "react"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const StepsContainer = props => {
  const step1Ref = useRef()
  const step2Ref = useRef()

  const [currStep, setCurrStep] = useState(0)

  const steps = [
    <Step1 ref={step1Ref} />,
    <Step2 ref={step2Ref} />,
    <Step3 />
  ]

  function next() {
    setCurrStep(currStep + 1)
  }

  function createUser() {
    let data

    if (step1Ref && step2Ref) {
      data = {
        ...step1Ref.current.getData(),
        ...step2Ref.current.getData()
      }
    }
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