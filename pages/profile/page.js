import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import VerifyEmail from "./verifyEmail";
import WindowPopUp from "../../components/windowPopUp";
import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";

const Profile = () => {
  //input values
  const [newNameVal, setNewNameVal] = useState("")

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

  //window pop up
  const [windowContent, setWindowContent] = useState()
  const [windowActive, setWindowActive] = useState(false)

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

  function setWindowPopUp(content) {
    setWindowContent(() => content)
    setWindowActive(() => true)
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

  function signOut() {
    window.localStorage.removeItem("keepLogged")
    navigate("/")
  }

  return (
    <div style={{margin: '0 auto', width: '100%'}}>
      <WindowPopUp content={windowContent} active={windowActive} setActive={setWindowActive} />
      <div style={{position: 'flex', flexDirection: 'column'}}>
        <button 
        style={{position: 'absolute', right: 10, top: 30}}
        type="button"
        onClick={() => signOut()}>Voltar</button>

        <button type="button" onClick={() => windowRef.current.open()}>Mudar popUp</button>

        <div style={{margin: "0 auto", textAlign: 'center'}}>
          <h1>Página do perfil</h1>
          <img src={photoUrl} alt="Profile picture" style={{maxHeight: 250, maxWidth: 250}} />
          <button type="button" onClick={() => setWindowPopUp(<AlterPicture pictureUrl={photoUrl} email={email} />)}>Mudar imagem</button>
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
            <button type="button" onClick={() => setWindowPopUp(<AlterPassword  />)}>Alterar senha</button>
          </div>
        </div>

        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{message}</p>
        </div>
      </div>
  )
}

export default Profile