import { useEffect, useRef, useState } from "react"
import { getStorage, ref as storageRef, listAll, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile, getAuth } from "firebase/auth"

import editIcon from "../../assets/editIcon.png"

export const AlterPicture = (props) => {
  const [newPicture, setNewPicture] = useState(props.pictureUrl)
  const [message, setMessage] = useState("Mensagem")

  const [hoveringImage, setHoveringImage] = useState(false)

  const filePicker = useRef()

  async function updatePicture() {
    if (!newPicture) return console.log("Sem imagem")

    let newPhotoURL

    if (typeof(newPicture) === "object") {
      newPhotoURL = await uploadPicture()
    } else if (typeof(newPicture) === "string") {
      newPhotoURL = newPicture
    }

    updateProfile(getAuth().currentUser, {photoURL: newPhotoURL})
      .then(() => console.log("Imagem Mudada"))
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
      <div>
        <div 
          style={{display: "grid", height: 150, width: 150, margin: "0 auto"}}
          onMouseEnter={() => setHoveringImage(true)} 
          onMouseLeave={() => setHoveringImage(false)}>
          <img 
            style={gridOverlay}
            src={typeof(newPicture) === "object" ? URL.createObjectURL(newPicture) : newPicture} 
          />

          <div
            style={hoveringImage ? {...gridOverlay, ...{backgroundColor: "rgba(0,0,0,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}} : {display: "none"}}
            onClick={() => filePicker.current?.click()}>

            <img 
              style={{width:70, height: 70}}
              src={editIcon}
            />
          </div>

          <input style={{display: "none"}} type="file" ref={filePicker} onChange={evt => setNewPicture(evt.target.files[0])} />
        </div>
      </div>
      <RecentPictures email={props.email} changeState={setNewPicture} />
      <button type="button" onClick={() => updatePicture()}>Alterar imagem</button>
      <p>{message}</p>
    </div>
  )
}

const gridOverlay = {
  gridRowStart: 1,
  gridColumnStart: 1,
  placeSelf: "center",

  objectFit: "cover", 
  height: 150, 
  width: 150
}

const RecentPictures = (props) => {
  const [urlList, setUrlList] = useState([])
  const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)

  useEffect(() => {
    listAll(folderRef)
      .then((res) => {
        let items = res.items

        if (items.length > 3) {
          items = items.slice(-3)
        }

        items.forEach((item) => {
          getDownloadURL(item)
            .then(url => {
              setUrlList(urlList => [...urlList, url]) 
            })
      })}).catch(error => {
        console.log(error)
      })
  }, [])

  return urlList.length > 0 ? (
    <div>
      <h3>Recent pictures</h3>
      <div style={{display:"flex", alignItems: "center"}}>
        {urlList.map((url, index) => {
          return <ImageExample imageURL={url} changeState={props.changeState} key={index} />}
        )}
      </div>
      <hr />
    </div>
  ) : null
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
          height: 70
        }} />
    </div>
  )
}