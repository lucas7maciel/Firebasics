import { useState } from "react"
import PasswordInput from "../../components/passwordInput"

const Step1 = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div>
      <h1>Step 1</h1>
    </div>
  )
 }

 export default Step1