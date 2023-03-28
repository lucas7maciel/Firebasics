
import { useState } from "react"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const StepsContainer = props => {
  const steps = [
    <Step1 />,
    <Step2 />,
    <Step3 />
  ]

  return (
    <div>
      {steps[props.currStep]}
    </div>
  )
}

export default StepsContainer