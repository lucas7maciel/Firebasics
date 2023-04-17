import { useState, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref as storageRef, uploadBytes, uploadString, getDownloadURL} from "firebase/storage"

const Step3 = (props) => {
  const [message, setMessage] = useState("Criando usuário")
  useEffect(() => /*createUser()*/console.log("Trocar por create user"), [])

  console.log(props.user)
  async function createUser() {
    await createUserWithEmailAndPassword(getAuth(), props.user.email, props.user.password)
    .then(() => {
      console.log("Usuário criado, atualizando dados...")
      
      if (props.user.displayName || props.user.picture) {
        console.log(`Profile pic:`)
        console.log(user.picture)
        updateData()
      }
    })
    .catch((error) => {
      //setMessage(error.message)
      console.log(error.message)
    });
  }

  async function updateData() {
    const storageRef = storageRef(storage, `users/${user.email}/about_me.txt`)

    await uploadString(storageRef, user.aboutMe)
      .then(() => console.log("Descrição adicionada"))
      .catch(error => console.log("Erro ao adicionar descrição"))

    let downloadUrl

    if (user.picture) {
      downloadUrl = await getProfilePic()
    }

    updateProfile(getAuth().currentUser, {displayName: user.displayName || "", photoURL: downloadUrl || ""})
    .then(() => {
      //setMessage("Dados atualizados")
      console.log("Dados atualizados")
    })
    .catch(error => {
      //setMessage("Erro ao atualizar dados")
      console.log(error.message)
    })
  }

  async function getProfilePic() {
    let imageUrl
    const imageRef = storageRef(storage, `users/${user.email}/profile_pictures/1`)

    await uploadBytes(imageRef, user.picture)
    .then(async () => {

      await getDownloadURL(imageRef)
      .then(url => imageUrl = url)
    })
    .catch((error) => {
      console.log("Erro ao subir imagem")
      console.log(error.message)
      //setMessage("Erro ao adicionar foto de perfil")

      imageUrl = null
    })

    return imageUrl
  }

  return (
    <>
    <h1 className="step-title">Criando usuário</h1>
    <div className="step">
      <h2>Tenis</h2>
    </div>
    </>
  )
}

export default Step3