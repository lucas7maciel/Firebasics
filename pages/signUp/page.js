import { useState, useRef, useEffect } from "react"

import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, uploadString, getDownloadURL} from "firebase/storage"

import { useNavigate } from "react-router-dom"

import { pageStyle, containerStyle, buttonStyle } from '../../functions/stylePatterns';
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
    3: {component: <Step3 />}
  }

  useEffect(() => {
    //hook used to create the user and set their data
    if (currStep < Object.keys(steps).length) return

    createUser()
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
    if (currStep >= Object.keys(steps).length) return //TROCAR POR LENGTH

    const step = steps[currStep]

    if (!step.ref) {
      return console.log("Não tem ref")
    }

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
      .then(() => console.log("Descrição uploadada"))
      .catch(error => console.log(error))

    let downloadUrl

    if (userData.picture) {
      downloadUrl = await getProfilePic()
    }

    updateProfile(getAuth().currentUser, {displayName: userData.displayName || "", photoURL: downloadUrl || ""})
    .then(() => {
      setMessage("Dados atualizados, pronto para uso")
      console.log("Dados atualizados")
    })
    .catch(error => {
      setMessage("Erro ao atualizar dados")
      console.log(error.message)
    })
  }

  async function getProfilePic() {
    let imageUrl
    const imageRef = ref(storage, `users/${userData.email}/profile_pictures/1`)

    await uploadBytes(imageRef, userData.picture)
    .then(async () => {

      await getDownloadURL(imageRef)
      .then(url => imageUrl = url)
    })
    .catch((error) => {
      console.log("Erro ao subir imagem")
      console.log(error.message)

      imageUrl = null
    })

    return imageUrl
  }

  return (
    <div style={pageStyle}>
    <h2 style={{color: "white", fontWeight: "bold"}}>CADASTRO</h2>
    <div style={containerStyle}>
      {steps[currStep].component}

      <p style={{textAlign: "center"}}>{message}</p>
      <div style={{textAlign: "center", marginTop: 20}}>
        <button style={buttonStyle} type="button" onClick={() => back()}>Voltar</button>
        <button style={buttonStyle} type="button" onClick={() => next()}>Próximo</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp