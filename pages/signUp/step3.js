import { useState, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref as storageRef, uploadBytes, uploadString, getDownloadURL} from "firebase/storage"

const Step3 = (props) => {
  useEffect(() => createUser(), [])

  async function createUser() {
    await createUserWithEmailAndPassword(getAuth(), props.userData.email, props.userData.password)
    .then(() => {
      console.log("Usuário criado, atualizando dados...")
      
      if (props.userData.displayName || props.userData.picture) {
        console.log(`Profile pic:`)
        console.log(userData.picture)
        updateData()
      }
    })
    .catch((error) => {
      //setMessage(error.message)
      console.log(error.message)
    });
  }

  async function updateData() {
    const storageRef = storageRef(storage, `users/${userData.email}/about_me.txt`)

    await uploadString(storageRef, userData.aboutMe)
      .then(() => console.log("Descrição adicionada"))
      .catch(error => console.log("Erro ao adicionar descrição"))

    let downloadUrl

    if (userData.picture) {
      downloadUrl = await getProfilePic()
    }

    updateProfile(getAuth().currentUser, {displayName: userData.displayName || "", photoURL: downloadUrl || ""})
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
    const imageRef = storageRef(storage, `users/${userData.email}/profile_pictures/1`)

    await uploadBytes(imageRef, userData.picture)
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
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <h1>Criando usuário</h1>
      <h2>Tenis</h2>
    </div>
  )
}

export default Step3