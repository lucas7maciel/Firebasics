import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const RecoverPasw = () => {
  const [emailVal, setEmailVal] = useState("")
  const [message, setMessage] = useState("Uma confirmação será enviada para o seu email")

  const navigate = useNavigate()

  function updateInput(event, changeState) {
    changeState(event.target.value)
  }

  function sendLink() {
    if (!emailVal) return setMessage("Campo vazio")
    else if (!emailIsValid(emailVal)) return setMessage("Email inválido")

    sendPasswordResetEmail(getAuth(), emailVal)
    .then(() => setMessage("Email enviado, confira na caixa de mensagens"))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setMessage("Erro ao enviar email")
    });
  }

  function emailIsValid() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal)) return true
  
    return false
  }

  return (
    <div style={{margin: "0 auto"}}>
    <div style={{textAlign: 'center'}}>
      <h1>Recuperar senha</h1>
      <form>
        <input type="text" placeholder="Email" value={emailVal} onChange={evt => updateInput(evt, setEmailVal)} ></input>
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