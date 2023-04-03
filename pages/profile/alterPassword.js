
import { useState } from "react"
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth"

export const AlterPassword = () => {
  const [message, setMessage] = useState("")

  const [oldPassw, setOldPassw] = useState("")
  const [newPassw, setNewPassw] = useState("")
  const [confNewPassw, setConfNewPassw] = useState("")

  async function updatePassw() {
    //if (!checkConditions) return
    const auth = getAuth()
    const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassw)

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {

        updatePassword(auth.currentUser, newPassw)
          .then(() => setMessage("Senha alterada com sucesso"))
          .catch(() => setMessage("Erro ao alterar a senha"))
      })
      .catch(error => {
        console.log(error)
        setMessage("A senha informada não confere ou houve erro")
      })        
  }

  function checkConditions() {
    //ver se senha antiga confere
    if (newPassw !== confNewPassw) {
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
    <div>
      <form style={{display: 'flex', flexDirection: 'column'}}>
        <input type="password" value={oldPassw} onChange={evt => setOldPassw(evt.target.value)} />
        <input type="password" value={newPassw} onChange={evt => setNewPassw(evt.target.value)} />
        <input type="password" value={confNewPassw} onChange={evt => setConfNewPassw(evt.target.value)} />
      </form>
      <button type="button" onClick={() => updatePassw()}>Alterar senha</button>
      <p>{message}</p>
    </div>
  )
}