import { useEffect, useState } from "react"
import { getStorage, ref as storageRef, listAll, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile, getAuth } from "firebase/auth"

import { buttonStyle } from "../../functions/stylePatterns"
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
    let newIndex

    await listAll(folderRef)
      .then(res => newIndex = res.items.length + 1)
      .catch(error => console.log(error))
    
    //sobe a ultima com uma quantidade a mais
    if (!newIndex) return

    let newPhotoURL
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
    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '0 auto'}}>
      <ImagePicker picture={newPicture} changePicture={setNewPicture} />
      <RecentPictures email={props.email} changeState={setNewPicture} />
      <button style={buttonStyle} type="button" onClick={() => updatePicture()}>Alter Picture</button>
      <p>{message}</p>
    </div>
  )
}

const RecentPictures = (props) => {
  const [urlList, setUrlList] = useState([])
  const [stage, setStage] = useState("Loading")

  const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)

  useEffect(() => {
    listAll(folderRef)
      .then((res) => {
        let items = res.items.slice(0, -1)

        if (items.length <= 1) {
          setStage(() => "NoPics")
        } else if (items.length > 3) {
          items = items.slice(-3)
        }

        items.forEach((item) => {
          getDownloadURL(item)
            .then(url => {
              setUrlList(urlList => [...urlList, url]) 
            })
      })}).catch(error => {
        setStage(() => "Error")
      })
  }, [])

  useEffect(() => console.log(recentPicsStages[stage]), [stage])

  return urlList.length > 0 ? (
    <div style={{marginTop: 15, width: 240}}>
      <hr />
      <h3>Recent pictures</h3>
      <div style={{display:"flex", alignItems: "center"}}>
        {urlList.map((url, index) => {
          return <ImageExample imageURL={url} changeState={props.changeState} key={index} />}
        )}
      </div>
      <hr />
    </div>
  ) : recentPicsStages[stage]
}

const loadingAnimation = `
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const recentPicsStages = {
  Loading: 
  (<div style={{width: 240}}>
    <hr />
    <img style={{
      height: 60, 
      width: 60,
      transform: "rotate(0deg)",
      transform: "rotate(360deg)",
      animation: `${loadingAnimation} 2s linear infinite`
      }} src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="Loading" />
    <hr />
  </div>),

  NoPics:
  (<div>
    <h3>No pictures</h3>
  </div>),

  Error:
  (<div>
    <h3>Erro ao encontrar imagens</h3>
  </div>)
}

const ImageExample = (props) => {
  return (
    <div style={{flex: 1, marginRight: 5, marginLeft: 5}} onClick={() => props.changeState(props.imageURL)}>
      <img 
        src={props.imageURL} 
        alt="Example image" 
        style={{
          objectFit: "cover",
          width: 70,
          height: 70,
          cursor: "pointer"
        }} />
    </div>
  )
}