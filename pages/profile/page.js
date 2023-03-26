import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification, updatePassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";

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
  const [emailVerified, setEmailVerified] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (user && !infoLoaded) {
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

  async function updateProfile(displayName, photoUrl) {
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

  /*function loadInfo() {
    this.setState({
      infoLoaded: true,

      emailVerified: user.emailVerified,
      email: user.email,
      photoUrl: user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png",
      displayName: user.displayName || "(Sem nome)"
    })
  }*/

  return (
    <div style={{margin: '0 auto'}}>
      <div>
        <Link to={"/"} style={{position: 'absolute', right: 10, top: 30}}>Voltar</Link>

        <div style={{margin: "0 auto", textAlign: 'center'}}>
          <h1>Página do perfil</h1>
          <img src={photoUrl} alt="Profile picture" style={{maxHeight: 250, maxWidth: 250}}></img><br></br>
          <h2>{email}</h2>
          <h3>{displayName}</h3>
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

/*class Profile extends Component {
  constructor(props) {
    super(props)

    this.auth = getAuth()

    this.state = {
      user: {},
      infoLoaded: false,
      email: "",
      displayName: "",
      photoUrl: "",
      emailVerified: "...",
      
      newName: "",
      newPassw: "",
      newPhoto: "",

      message: "Seus dados são exibidos nesta página",
    }
  }

  componentDidMount() {
    if (this.auth.currentUser) {
      this.setState({user: this.auth.currentUser})
    } else {
      this.auth.onAuthStateChanged(user => {this.setState({user: user});console.log(user);})
    }
  }

  componentDidUpdate() {
    if (this.state.user && ! this.state.infoLoaded) {
      this.loadInfo()
    }
  }

  updateInput(event, stateKey) {
    const newValue = event.target.value
    this.setState({[stateKey]: newValue})
  }

  verifyEmail() {
    sendEmailVerification(this.state.user)
    .then(() => {
      this.setState({message: "Confirmação enviada, o dado será atualizado na próxima entrada"})
    })
    .catch((erro) => {
      console.log("Erro")
      console.log(erro)
    })
  }

  updatePasw() {
    updatePassword(this.state.user, this.state.newPassw)
    .then(() => {
      console.log("Senha alterada")

      this.setState({message: "Senha alterada"})
    })
    .catch(error => {
      console.log(error)

      this.setState({message: "Erro ao alterar senha"})
    })
  }

  async updateProfile(displayName, photoUrl) {
    if (displayName == "") {
      displayName = this.state.displayName
    }

    if (photoUrl == "") {
      photoUrl = this.state.photoUrl
    }

    updateProfile(getAuth().currentUser, {displayName: displayName, photoURL: photoUrl})
    .then(() => {
      console.log("Sucesso")
      this.setState({message: "Dados alterados com sucesso"})
    })
    .catch(error => {
      console.log("Erro")
      console.log(error)
      this.setState({message: "Erro ao alterar dados"})
    })
  }

  loadInfo() {
    const user = this.state.user

    this.setState({
      infoLoaded: true,

      emailVerified: user.emailVerified,
      email: user.email,
      photoUrl: user.photoURL || "https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png",
      displayName: user.displayName || "(Sem nome)"
    })
  }

  render() {
    return(
      <div style={{margin: '0 auto'}}>
      <div>
        <Link to={"/"} style={{position: 'absolute', right: 10, top: 30}}>Voltar</Link>

        <div style={{margin: "0 auto", textAlign: 'center'}}>
          <h1>Página do perfil</h1>
          <img src={this.state.photoUrl} alt="Profile picture" style={{maxHeight: 250, maxWidth: 250}}></img><br></br>
          <h2>{this.state.email}</h2>
          <h3>{this.state.displayName}</h3>
          <button type="text" disabled={this.state.emailVerified} onClick={() => this.verifyEmail()}>Verificar email</button>
        </div>

        <hr style={{marginTop: 15}}></hr>

        <div style={{display: 'flex'}}>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Alterar imagem</h2>
            <input type="text" placeholder="Url da imagem" value={this.state.newPhoto} onChange={evt => this.updateInput(evt, "newPhoto")}></input>
            <button type="button" onClick={() => this.updateProfile("", this.state.newPhoto)}>Mudar imagem</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Alterar nome</h2>
            <input type="text" value={this.state.newName} onChange={evt => this.updateInput(evt, "newName")}></input>
            <button type="button" onClick={() => this.updateProfile(this.state.newName, "")}>Alterar nome</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <h2>Email verificado</h2>
            <h3>{this.state.emailVerified ? "Sim" : "Não"}</h3>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}> 
            <h3>Alterar senha</h3>
            <input type="text" value={this.state.newPassw} onChange={evt => this.updateInput(evt, "newPassw")}></input><br></br>
            <button type="button" onClick={() => this.updatePasw()}>Alterar</button>
          </div>
        </div>

        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{this.state.message}</p>
      </div>
      </div>
    )
  }
}*/

export default Profile