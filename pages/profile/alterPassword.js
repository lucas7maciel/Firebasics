
import { useState } from "react"
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth"
import { inputStyle, buttonStyle } from "../../functions/stylePatterns"

export const AlterPassword = () => {
  const [message, setMessage] = useState("Mensage")

  const [oldPassw, setOldPassw] = useState("")
  const [newPassw, setNewPassw] = useState("")
  const [confNewPassw, setConfNewPassw] = useState("")

  async function updatePassw() {
    const auth = getAuth()

    if (!checkConditions(auth.currentUser.email)) return

    updatePassword(auth.currentUser, newPassw)
      .then(() => setMessage("Senha alterada com sucesso"))
      .catch(() => setMessage("Erro ao alterar a senha"))     
  }

  async function checkConditions(email) {
    //ver se senha antiga confere
    const credential = EmailAuthProvider.credential(email, oldPassw)
    let correctPassw = false

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => correctPassw = true)
      .catch(error => {
        console.log(error)
        setMessage("A senha informada não confere ou houve erro")
      })   

    if (!correctPassw) {
      setMessage("Senha incorreta")
      return false
    }
    else if (newPassw !== confNewPassw) {
      setMessage("Senhas não conferem")
      return false
    } else if (!newPassw) {
      setMessage("Senha vazia")
      return false
    } else if (newPassw.length > 6) {
      setMessage("A senha deve ter ao menos 6 caracteres")
      return false
    }
    
    return true
  }

  return (
    <div style={containerStyle}>
      <h3>Enter the new password</h3>
      <form style={{display: 'flex', flexDirection: 'column'}}>
        <input style={inputStyle} type="password" placeholder="Old password" value={oldPassw} onChange={evt => setOldPassw(evt.target.value)} />
        <input style={inputStyle} type="password" placeholder="New password" value={newPassw} onChange={evt => setNewPassw(evt.target.value)} />
        <input style={inputStyle} type="password" placeholder="Confirm new password" value={confNewPassw} onChange={evt => setConfNewPassw(evt.target.value)} />
      </form>
      <p>{message}</p>
      <button style={buttonStyle} type="button" onClick={() => updatePassw()}>Alterar Password</button>
    </div>
  )
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}
