
import { useState } from "react"
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth"

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
    const credential = EmailAuthProvider.credential(email, oldPassw)
    let conditionsOk = false
    let correctPassw = false

    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => correctPassw = true)
      .catch(error => {
        console.log(error)
        setMessage("A senha informada não confere ou houve erro")
      })


    if (!correctPassw) {
      setMessage("Senha incorreta")
    }
    else if (newPassw !== confNewPassw) {
      setMessage("Senhas não conferem")
    } else if (!newPassw) {
      setMessage("Senha vazia")
    } else if (newPassw.length > 6) {
      setMessage("A senha deve ter ao menos 6 caracteres")
    } else {
      conditionsOk = true
    }
    
    return conditionsOk
  }

  return (
    <div className="center">
      <h3>Enter the new password</h3>
      <form className="popup-form">
        <input 
          type="password"
          placeholder="Old password"
          value={oldPassw}
          onChange={evt => setOldPassw(evt.target.value)} 
        />
        <input 
          type="password"
          placeholder="New password"
          value={newPassw}
          onChange={evt => setNewPassw(evt.target.value)} 
        />
        <input
          type="password" 
          placeholder="Confirm new password" 
          value={confNewPassw} 
          onChange={evt => setConfNewPassw(evt.target.value)} 
        />
      </form>
      <p className="message">{message}</p>
      <button type="button" onClick={() => updatePassw()}>Alterar Password</button>
    </div>
  )
}

