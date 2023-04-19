import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { emailIsValid } from "../../functions/emailIsValid";

export const RecoverPasw = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("Digite seu pipipipopopo")

  const navigate = useNavigate()

  function sendLink() {
    if (!email || !emailIsValid(email)) {
      setMessage("Campo vazio ou email inválido")
      return
    }

    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        setMessage("Email enviado, confira na caixa de mensagens")
      })
      .catch((error) => {
        setMessage("Erro ao enviar email")
      });
  }

  return (
    <div className="page">
    <div className="content">
      <h1 className="page-title">RECUPERAR SENHA</h1>

      <form style={{textAlign: "center"}}>
        <label htmlFor="email">Email</label><br />
        <input 
          type="text" 
          placeholder="Email"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />
      </form>

      <p className="message">{message}</p>

      <div className="buttons">
        <button type="button" onClick={() => sendLink()}>Enviar Link</button><br/>
        <button type="button" onClick={() => navigate("/")}>Voltar</button>
      </div>
    </div>
    </div>
  )
}
