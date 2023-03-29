
import { useState, useRef, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"

import { storage } from "../../functions/firebase"

import Step1 from "./step1"
import Step2 from "./step2"
import Step3 from "./step3"

const StepsContainer = props => {
  const [currStep, setCurrStep] = useState(0)
  const [userData, setUserData] = useState({})

  const step1Ref = useRef()
  const step2Ref = useRef()

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
    .then(async userCredential => {
      props.changeMessage("Usuário criado, atualizando dados")
      console.log("Usuário criado, atualizando dados")

      if (!userData.profilePic && !userData.displayName) return

      if (userData.profilePic) {
        await uploadProfilePic()
      }

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
    updateProfile(user, {displayName: userData.displayName || "", photoURL: userData.profilePic || ""})
    .then(() => {
      props.changeMessage("Dados atualizados")
      console.log("Dados atualizados")
      updateProfilePic()
    })
    .catch(error => {
      props.changeMessage("Erro ao atualizar dados")
      console.log("Erro ao atualizar dados")
      console.log(error.message)
    })
  }

  async function uploadProfilePic() {
    const imageRef = ref(storage, `images/profile_pictures/teste`)

    uploadBytes(imageRef, userData.profilePic)
    .then(() => {
      userData.profilePic = getDownloadURL(imageRef)
    })
    .catch(error => {
      props.changeMessage("Imagem não uploadada")
      console.log("Foto não mudada")
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