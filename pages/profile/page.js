import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification, updatePassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import VerifyEmail from "../../components/verifyEmail";

const Profile = () => {
  //input values
  const [newNameVal, setNewNameVal] = useState("")
  const [newPaswVal, setNewPaswVal] = useState("")
  const [newPhotoVal, setNewPhotoVal] = useState("")

  const [user, setUser] = useState(getAuth().currentUser)

  if (!user) {
    getAuth().onAuthStateChanged(user => setUser(user))
  }

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [emailVerified, setEmailVerified] = useState(true)
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

  function updateInput(event, changeState) {
    changeState(event.target.value)
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

  function updateProfile(displayName, photoUrl) {
    if (displayName == "") {
      displayName = newNameVal
    }

    if (photoUrl == "") {
      photoUrl = newPhotoVal
    }

    updateProfile(getAuth().currentUser, {displayName: displayName, photoURL: photoUrl})
    .then(() => {
      console.log("Sucesso")
      setMessage("Dados alterados com sucesso")
    })
    .catch(error => {
      console.log("Erro")
      console.log(error)
      setMessage("Erro ao alterar dados")
    })
  }

  function signOut() {
    window.localStorage.removeItem("keepLogged")
    navigate("/")
  }

  return (
    <div style={{margin: '0 auto'}}>
      <div>
        <button 
        style={{position: 'absolute', right: 10, top: 30}}
        type="button" 
        onClick={() => signOut()}>Voltar</button>

        <div style={{margin: "0 auto", textAlign: 'center'}}>
          <h1>Página do perfil</h1>
          <img src={photoUrl} alt="Profile picture" style={{maxHeight: 250, maxWidth: 250}}></img><br></br>
          <h2>{email}</h2>
          <h3>{displayName}</h3>
          <VerifyEmail verified={emailVerified} />
          <button type="text" disabled={emailVerified} onClick={() => verifyEmail()}>Verificar email</button>
        </div>

        <hr style={{marginTop: 15}}></hr>

        <div style={{display: 'flex'}}>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Alterar imagem</h2>
            <input type="text" placeholder="Url da imagem" value={newPhotoVal} onChange={evt => updateInput(evt, setNewPhotoVal)}></input>
            <button type="button" onClick={() => updateProfile("", newPhotoVal)}>Mudar imagem</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Alterar nome</h2>
            <input type="text" value={newNameVal} onChange={evt => updateInput(evt, setNewNameVal)}></input>
            <button type="button" onClick={() => updateProfile(newNameVal, "")}>Alterar nome</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Email verificado</h2>
            <h3>{emailVerified ? "Sim" : "Não"}</h3>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}> 
            <h3>Alterar senha</h3>
            <input type="text" value={newPaswVal} onChange={evt => updateInput(evt, setNewPaswVal)}></input><br></br>
            <button type="button" onClick={() => updatePasw()}>Alterar</button>
          </div>
        </div>

        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{message}</p>
      </div>
      </div>
  )
}

export default Profile