
import { useState, useRef, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { storage } from "../../functions/firebase"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const StepsContainer = props => {
  const [currStep, setCurrStep] = useState(1)
  const [userData, setUserData] = useState({})

  const step1Ref = useRef()
  const step2Ref = useRef()

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
    if (currStep < Object.keys(steps).length) return
    
    createUserWithEmailAndPassword(getAuth(), userData.email, userData.password)
    .then(() => {
      props.changeMessage("Usuário criado")
      console.log("Usuário criado")
    })
    .catch((error) => {
      props.changeMessage("Erro ao criar usuário")
      console.log(error.message)
    });


    if (userData.displayName || userData.profilePic) {
      updateData()
    }

  }, [userData])

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
    if (currStep > 1) {
      setCurrStep(currStep => currStep - 1)
    }
  }

  async function updateData() {
    let downloadUrl

    if (userData.profilePic) {
      downloadUrl = await getProfilePic()
      console.log(`Download url variável: ${downloadUrl}`)
    }

    updateProfile(getAuth().currentUser, {displayName: userData.displayName || "", photoURL: downloadUrl || ""})
    .then(() => {
      props.changeMessage("Dados atualizados")
      console.log("Dados atualizados")
    })
    .catch(error => {
      props.changeMessage("Erro ao atualizar dados")
      console.log("Erro ao atualizar dados")
      console.log(error.message)
    })
  }

  async function getProfilePic() {
    let imageUrl
    const imageRef = ref(storage, `images/profile_pictures/${userData.email}`)

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
      <div>
        <button type="button" onClick={() => back()}>Voltar</button>
        <button type="button" onClick={() => next()}>Próximo</button>
      </div>
    </div>
  )
}

export default StepsContainer