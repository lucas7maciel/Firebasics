import { useState } from "react"
import { getStorage, ref as storageRef, listAll, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile, getAuth } from "firebase/auth"

import { RecentPictures } from "./recentPictures.js"
import { ImagePicker } from "../../components/imagePicker"

export const AlterPicture = (props) => {
  const [newPicture, setNewPicture] = useState(props.pictureUrl)
  const [message, setMessage] = useState("Hover the image to change it locally")

  async function updatePicture() {
    if (!newPicture) return console.log("Sem imagem")

    let newPhotoURL

    if (typeof(newPicture) === "object") {
      newPhotoURL = await uploadPicture()
    } else if (typeof(newPicture) === "string") {
      newPhotoURL = newPicture
    }

    updateProfile(getAuth().currentUser, {photoURL: newPhotoURL})
      .then(() => setMessage("Imagem has been changed"))
      .catch(error => console.log(`Erro ao alterar imagem\n${error}`))
  }

  async function uploadPicture() {
    //checa quantas imagens tem
    const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)
    let newIndex, newPhotoURL

    await listAll(folderRef)
      .then(res => newIndex = res.items.length + 1)
      .catch(error => console.log(error))
    
    //sobe a ultima com uma quantidade a mais
    if (!newIndex) return

    const ref = storageRef(getStorage(), `users/${props.email}/profile_pictures/${newIndex}`)

    await uploadBytes(ref, newPicture)
      .catch(error => console.log(`Erro ao uploadar\n${error}`))

    //pega o link de download
    await getDownloadURL(ref)
      .then(url => newPhotoURL = url)
      .catch(error => console.log(`Erro ao pegar imagem nova\n${error}`))

    //retorna o link
    if (!newPhotoURL) {
      console.log("Deu erro")
      return null
    }

    return newPhotoURL
  }

  return (
    <div className="alter-picture">
      <ImagePicker picture={newPicture} changePicture={setNewPicture} />
      <hr/>
      <RecentPictures email={props.email} changeState={setNewPicture} />
      <hr/>
      <button type="button" onClick={() => updatePicture()}>Alter Picture</button>
      <p>{message}</p>
    </div>
  )
}
