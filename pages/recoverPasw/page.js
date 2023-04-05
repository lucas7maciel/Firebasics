import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
    <h1>Recuperar senha</h1>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "solid black", borderRadius: 10, width: 300}}>
      <div style={{height: 20}} />
      <form>
        <input type="text" placeholder="Email" value={emailVal} onChange={evt => updateInput(evt, setEmailVal)} ></input>
      </form>
      <p style={{textAlign: "center"}}>{message}</p>
      <div style={{display:"flex", flexDirection:'column'}}>
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