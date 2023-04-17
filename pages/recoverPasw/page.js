import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import "../../functions/styles.css"

const RecoverPasw = () => {
  const [emailVal, setEmailVal] = useState("")
  const [message, setMessage] = useState("Digite seu pipipipopopo")

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
    <div className="page">
    <div className="content">
      <h1 className="page-title">RECUPERAR SENHA</h1>

      <div style={{height: 20}} />
      <form style={{textAlign: "center"}}>
        <label htmlFor="email">Email</label><br />
        <input type="text" placeholder="Email" id="email" value={emailVal} onChange={evt => updateInput(evt, setEmailVal)} />
      </form>

      <p className="message">{message}</p>

      <div className="buttons">
        <button type="button" onClick={() => sendLink()}>Enviar Link</button>
        <div style={{height: 8}} />
        <button type="button" onClick={() => navigate("/")}>Voltar</button>
      </div>
      <div style={{height: 20}} />
    </div>
    </div>
  )
}

export default RecoverPasw