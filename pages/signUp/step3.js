import { useState, useEffect } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref as storageRef, uploadBytes, uploadString, getDownloadURL, getStorage} from "firebase/storage"

export const Step3 = (props) => {
  const [message, setMessage] = useState("Criando usuário")

  useEffect(() => /*createUser()*/console.log("Trocar por create user"), [])

  function createUser() {
    createUserWithEmailAndPassword(getAuth(), props.user.email, props.user.password)
      .then(() => {
        this.props.setMessage("Usuário criado, atualizando dados")
        
        if (props.user.displayName || props.user.picture) {
          updateData()
        }
      })
      .catch((error) => {
        this.props.setMessage("Erro ao criar usuário")
      });
  }

  async function updateData() {
    let downloadUrl 
  
    if (user.aboutMe) {
      await uploadDescription()
    }

    if (user.picture) {
      downloadUrl = await getProfilePic()
    }

    updateProfile(getAuth().currentUser, {displayName: user.displayName || "", photoURL: downloadUrl || ""})
      .then(() => {
        this.props.setMessage("Dados atualizados")
      })
      .catch(error => {
        this.props.setMessage("Falha ao atualizar dados")
      })
  }

  async function getProfilePic() {
    const imageRef = storageRef(storage, `users/${user.email}/profile_pictures/1`)
    let imageUrl

    await uploadBytes(imageRef, user.picture)
      .then(async () => {

        await getDownloadURL(imageRef)
          .then(url => imageUrl = url)
          .catch(error => this.props.setMessage("Erro"))
      })
      .catch((error) => {
        this.props.setMessage("Erro ao subir mensagem")
      })

    return imageUrl
  }

  async function uploadDescription() {
    const storageRef = storageRef(getStorage(), `users/${user.email}/about_me.txt`)

    await uploadString(storageRef, user.aboutMe)
      .then(() => console.log("Descrição adicionada"))
      .catch(error => console.log("Erro ao adicionar descrição"))
  }

  return (
    <div className="step">
      <h1 className="step-title">Criando usuário</h1>
      <h2>Tenis</h2>
    </div>
  )
}
