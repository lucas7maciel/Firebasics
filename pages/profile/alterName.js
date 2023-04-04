import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"

export const AlterName = () => {
  const [message, setMessage] = useState("")
  const [displayName, setDisplayName] = useState("")

  function changeName() {
    if (!checkName()) return

    updateProfile(getAuth().currentUser, {displayName: displayName})
      .then(() => setMessage("Nome alterado com sucesso!"))
      .catch(error => {
        console.log("Erro ao alterar nome")
        console.log(error)

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
    <div>
      <h3>Digite o nome novo</h3>
      <input value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
      <p>{message}</p>
      <button type="button" onClick={() => changeName()}>Mudar nome</button>
    </div>
  )
}

const containerStyle = {
  display: "flex"
}