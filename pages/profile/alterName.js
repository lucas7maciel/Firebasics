import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { inputStyle, buttonStyle } from "../../functions/stylePatterns"

export const AlterName = () => {
  const [message, setMessage] = useState("Message")
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
    <div style={containerStyle}>
      <h3>Enter the new name</h3>
      <input style={inputStyle} value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
      <p>{message}</p>
      <button style={buttonStyle} type="button" onClick={() => changeName()}>Alter Name</button>
    </div>
  )
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "opacity 5s ease-out"
}