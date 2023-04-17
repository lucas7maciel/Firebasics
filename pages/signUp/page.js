import { useState, useRef, useEffect } from "react"

import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, uploadString, getDownloadURL} from "firebase/storage"

import { useNavigate } from "react-router-dom"

import "../../functions/styles.css"
import "./style.css"
import { storage } from "../../functions/firebase"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

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
      component: <Step1 ref={step1Ref} />,
      ref: step1Ref 
    },
    2: {
      component: <Step2 ref={step2Ref} />,
      ref: step2Ref
    },
    3: {component: <Step3 ref={step3Ref} user={userData} />}
  }

  useEffect(() => {
    //hook used to create the user and set their data
    if (currStep < Object.keys(steps).length) return

    //createUser()
  }, [userData])

  async function createUser() {
    await createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
    .then(() => {
      setMessage("Usuário criado, atualizando dados...")
      
      if (userData.displayName || userData.picture) {
        console.log(`Profile pic:`)
        console.log(userData.picture)
        updateData()
      }
    })
    .catch((error) => {
      setMessage(error.message)
      console.log(error.message)
    });

  }

  function next() {
    //comentar
    if (currStep >= Object.keys(steps).length) return

    const step = steps[currStep]

    if (!step.ref) return

    //checks if the conditions of the step were satisfied
    //if so, they are added to the state userData and go to the next one
    if (!step.ref.current.verify()) return

    const stepData = step.ref.current.getData()

    setCurrStep(currStep => currStep + 1)
    setUserData(() => {
      return {...userData, ...stepData}
    })
  }

  function back() {
    if (currStep == 1) navigate("/")
  
    setCurrStep(currStep => currStep - 1)
  }

  async function updateData() {
    const storageRef = ref(storage, `users/${userData.email}/about_me.txt`)

    await uploadString(storageRef, userData.aboutMe)
      .then(() => setMessage("Descrição adicionada"))
      .catch(error => setMessage("Erro ao adicionar descrição"))

    let downloadUrl

    if (userData.picture) {
      downloadUrl = await getProfilePic()
    }

    updateProfile(getAuth().currentUser, {displayName: userData.displayName || "", photoURL: downloadUrl || ""})
    .then(() => {
      setMessage("Dados atualizados")
      console.log("Dados atualizados")
    })
    .catch(error => {
      setMessage("Erro ao atualizar dados")
      console.log(error.message)
    })
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