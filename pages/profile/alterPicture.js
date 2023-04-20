import { useState } from "react"
import { getStorage, ref as storageRef, listAll, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile, getAuth } from "firebase/auth"

import { RecentPictures } from "./recentPictures.js"
import { ImagePicker } from "../../components/imagePicker"

export const AlterPicture = (props) => {
  const [newPicture, setNewPicture] = useState(props.pictureUrl)
  const [message, setMessage] = useState("Click on the image to choose a local file")

  async function updatePicture() {
    if (!newPicture) {
      setMessage("No image selected")
      return
    }

    let newPhotoURL

    if (typeof(newPicture) === "object") {
      newPhotoURL = await uploadPicture()
    } else if (typeof(newPicture) === "string") {
      newPhotoURL = newPicture
    }

    setMessage("Changing image")

    updateProfile(getAuth().currentUser, {photoURL: newPhotoURL})
      .then(() => {
        setMessage("Image changed successfully")
      })
      .catch(error => {
        setMessage(error.message)
      })
  }

  async function uploadPicture() {
    setMessage("Uploading picture")

    //check how many images you have
    const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)
    let newIndex, newPhotoURL

    await listAll(folderRef)
      .then(res => {
        newIndex = res.items.length + 1
      })
      .catch(error => {
        setMessage("Error uploading image:\n" + error.message)
      })
    
    //upload the last one with its respective id (Last Id + 1)
    if (!newIndex) return

    const ref = storageRef(getStorage(), `users/${props.email}/profile_pictures/${newIndex}`)

    await uploadBytes(ref, newPicture)
      .catch(error => {
        setMessage("Error uploading image:\n" + error.message)
      })

    await getDownloadURL(ref)
      .then(url => {
        newPhotoURL = url
      })
      .catch(error => {
        setMessage("Error getting new image:\n" + error.message)
      })

    return newPhotoURL
  }

  return (
    <div className="alter-picture">
      <ImagePicker 
        picture={newPicture} 
        changePicture={setNewPicture}
      />
      <hr/>
      <RecentPictures 
        email={props.email} 
        changePicture={setNewPicture} 
        setMessage={setMessage} 
      />
      <hr/>
      <button type="button" onClick={() => updatePicture()}>Alter Picture</button>
      <p>{message}</p>
    </div>
  )
}
