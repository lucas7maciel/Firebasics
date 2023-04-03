import { useEffect, useState, useRef } from "react";
import { getAuth, sendEmailVerification, updateProfile, updatePassword } from "firebase/auth";
import { ref as storageRef,getStorage, listAll, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import VerifyEmail from "./verifyEmail";
import WindowPopUp from "../../components/windowPopUp";

const Profile = () => {
  //input values
  const [newNameVal, setNewNameVal] = useState("")
  const [newPaswVal, setNewPaswVal] = useState("")
  const [newPicture, setNewPicture] = useState("")

  //window pop up
  const [windowContent, setWindowContent] = useState(<h1>Teste do window</h1>)
  const [windowActive, setWindowActive] = useState(true)
  const windowRef = useRef()

  const [user, setUser] = useState(getAuth().currentUser)

  if (!user) {
    getAuth().onAuthStateChanged(user => setUser(user))
  }

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    const keepLogged = localStorage.getItem("keepLogged")

    if(keepLogged && keepLogged !== user.email) {
      signOut()
    } else if (!infoLoaded) {
      loadInfo()
    }
  }, [user])

  function loadInfo() {
    setEmailVerified(user.emailVerified)
    setEmail(user.email)
    setPhotoUrl(user.photoURL || "") //CAMINHO PARA "SEM FOTO"
    setDisplayName(user.displayName || "(Sem nome)")

    setInfoLoaded(true)
  }

  function setWindowPopUp(content, changeState) {
    setWindowActive(!windowActive)
  }

  function verifyEmail() {
    sendEmailVerification(user)
    .then(() => {
      setMessage("Confirmação enviada, o dado será atualizado na próxima entrada")
    })
    .catch((erro) => {
      console.log("Erro")
      console.log(erro)
    })
  }

  async function updatePicture() {
    if (!newPicture) return console.log("Sem imagem")

    //checa quantas imagens tem
    const folderRef = storageRef(getStorage(), `users/${email}/profile_pictures`)
    let newIndex

    await listAll(folderRef)
      .then(res => newIndex = res.items.length + 1)
      .catch(error => console.log(error))
    
    //sobe a ultima com uma quantidade a mais
    if (!newIndex) return

    let newPhotoURL
    const ref = storageRef(getStorage(), `users/${email}/profile_pictures/${newIndex}`)

    await uploadBytes(ref, newPicture)
      .catch(error => console.log(`Erro ao uploadar\n${error}`))

    //pega o link de download
    await getDownloadURL(ref)
      .then(url => newPhotoURL = url)
      .catch(error => console.log(`Erro ao pegar imagem nova\n${error}`))

    //altera os dados
    if (!newPhotoURL) {
      return console.log("Deu erro")
    }

    updateProfile(getAuth().currentUser, {photoURL: newPhotoURL})
      .then(() => setPhotoUrl(newPhotoURL))
      .catch(error => console.log(`Erro ao alterar imagem\n${error}`))
  }

  function updatePasw() {
    updatePassword(user, newPaswVal)
    .then(() => {
      console.log("Senha alterada")

      setMessage("Senha alterada")
    })
    .catch(error => {
      console.log(error)

      this.setState({message: "Erro ao alterar senha"})
    })
  }

  function signOut() {
    window.localStorage.removeItem("keepLogged")
    navigate("/")
  }

  return (
    <div style={{margin: '0 auto', border: 'solid green', width: '100%'}}>
      <div style={{position: 'flex', flexDirection: 'column'}}>
        <button 
        style={{position: 'absolute', right: 10, top: 30}}
        type="button"
        onClick={() => signOut()}>Voltar</button>

        <button type="button" onClick={() => windowRef.current.open()}>Mudar popUp</button>
        <WindowPopUp ref={windowRef} content={windowContent} />

        <div style={{margin: "0 auto", textAlign: 'center'}}>
          <h1>Página do perfil</h1>
          <img src={photoUrl} alt="Profile picture" style={{maxHeight: 250, maxWidth: 250}}></img><br></br>
          <input type="file" onChange={evt => setNewPicture(evt.target.files[0])} />
          <button type="button" onClick={() => updatePicture()}>Mudar imagem</button>
          <h2>{email}</h2>
          <h3>{displayName}</h3>
          <VerifyEmail verified={emailVerified} verifyFunc={verifyEmail} />
        </div>

        <hr style={{marginTop: 15}}></hr>

        <div style={{display: 'flex'}}>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Alterar nome</h2>
            <input type="text" value={newNameVal} onChange={evt => setNewNameVal(evt.target.value)}></input>
            <button type="button" onClick={() => console.log("Botar função de novo")}>Alterar nome</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}> 
            <h3>Alterar senha</h3>
            <input type="text" value={newPaswVal} onChange={evt => setNewPaswVal(evt.target.value)}></input><br></br>
            <button type="button" onClick={() => updatePasw()}>Alterar</button>
          </div>
        </div>

        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{message}</p>
        </div>
      </div>
  )
}

export default Profile