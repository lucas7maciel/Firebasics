import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"

export const AlterName = () => {
  const [message, setMessage] = useState("Message")
  const [displayName, setDisplayName] = useState("")

  function changeName() {
    if (!checkName()) return

    updateProfile(getAuth().currentUser, {displayName: displayName})
      .then(() => setMessage("Nome alterado com sucesso!"))
      .catch(error => {
        setMessage("Erro ao alterar nome")
      })
  }

  function checkName() {
    if (!displayName) {
      setMessage("Nome vazio")
      return false
    }

    return true
  }

  return (
    <div className="center">
      <h3>Enter the new name</h3>
      <input value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
      <p className="message">{message}</p>
      <button type="button" onClick={() => changeName()}>Alter Name</button>
    </div>
  )
}
