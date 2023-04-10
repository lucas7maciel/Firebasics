
import { useState, useRef, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { storage } from "../../functions/firebase"

import { buttonStyle } from "../../functions/stylePatterns"
import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"
import { useNavigate } from "react-router-dom"

const StepsContainer = props => {
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
      props.changeMessage("Usuário criado, atualizando dados...")
      
      if (userData.displayName || userData.profilePic) {
        updateData()
      }
    })
    .catch((error) => {
      props.changeMessage(error.message)
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
    let downloadUrl

    if (userData.profilePic) {
      downloadUrl = await getProfilePic()
      console.log(`Download url variável: ${downloadUrl}`)
    }

    updateProfile(getAuth().currentUser, {displayName: userData.displayName || "", photoURL: downloadUrl || ""})
    .then(() => {
      props.changeMessage("Dados atualizados, pronto para uso")
      console.log("Dados atualizados")
    })
    .catch(error => {
      props.changeMessage("Erro ao atualizar dados")
      console.log(error.message)
    })
  }

  async function getProfilePic() {
    let imageUrl
    const imageRef = ref(storage, `users/${userData.email}/profile_pictures/1`)

    await uploadBytes(imageRef, userData.profilePic)
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
    <div>
      {steps[currStep].component}
      <div style={{textAlign: "center", marginTop: 20}}>
        <button style={buttonStyle} type="button" onClick={() => back()}>Voltar</button>
        <button style={buttonStyle} type="button" onClick={() => next()}>Próximo</button>
      </div>
    </div>
  )
}

export default StepsContainer