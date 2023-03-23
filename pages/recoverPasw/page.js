import { useState } from "react"
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RecoverPasw = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  const [message, setMessage] = useState("Uma confirmação será enviada para o seu email")
  const [email, setEmail] = useState("")

  function updateInput(event, changeState) {
    const newValue = event.target.value
    changeState(newValue)
  }

  function sendLink() {
    if (!emailIsValid(email)) return setMessage("Email inválido")

    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Sucesso")

      setMessage("Email enviado")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setMessage("Erro ao enviar email")
    });
  }

  function emailIsValid(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }

    return false
  }

  return (
    <div style={{margin: "0 auto"}}>
    <div style={{textAlign: 'center'}}>
      <h1>Recuperar senha</h1>
      <form>
        <input type="text" placeholder="Email" value={email} onChange={evt => updateInput(evt, setEmail)} ></input>
      </form>
      <p>{message}</p>
      <div style={{display:"flex", flexDirection:'column'}}>
        <button type="button" onClick={() => sendLink()}>Enviar link</button>
        <button type="button" onClick={() => navigate("/")}>Voltar</button>
      </div>
    </div>
    </div>
  )
}

export default RecoverPasw