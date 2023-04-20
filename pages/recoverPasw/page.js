import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { emailIsValid } from "../../functions/emailIsValid";

export const RecoverPasw = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("Type your email")

  const navigate = useNavigate()

  function sendLink() {
    if (!email || !emailIsValid(email)) {
      setMessage("Empty field or invalid email")
      return
    }

    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        setMessage("Email sent, check inbox")
      })
      .catch((error) => {
        setMessage("Error sending email:\n" + error.message)
      });
  }

  return (
    <div className="page">
    <div className="content">
      <h1 className="page-title">RECOVER PASSWORD</h1>

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
        <button type="button" onClick={() => sendLink()}>Send Link</button><br/>
        <button type="button" onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
    </div>
  )
}
