
import { useState } from "react"
import { getAuth, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth"

export const AlterPassword = () => {
  const [message, setMessage] = useState("Fill in the fields to change your password")

  const [oldPassw, setOldPassw] = useState("")
  const [newPassw, setNewPassw] = useState("")
  const [confNewPassw, setConfNewPassw] = useState("")

  async function updatePassw() {
    const auth = getAuth()
    const conditionsOk = await checkConditions(auth.currentUser)

    if (!conditionsOk) return

    setMessage("Changing password")

    updatePassword(auth.currentUser, newPassw)
      .then(() => {
        setMessage("Password changed successfully")
      })
      .catch(error => {
        setMessage("Error when changing password:\n" + error.message)
      })
  }

  async function checkConditions(currentUser) {
    const credential = EmailAuthProvider.credential(currentUser.email, oldPassw)
    let conditionsOk = false
    let correctPassw = false

    await reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        correctPassw = true
      })
      .catch(error => {
        setMessage(error.message)
      })


    if (!correctPassw) {
      setMessage("Incorrect password")
    }
    else if (newPassw !== confNewPassw) {
      setMessage("Passwords do not match")
    } else if (!oldPassw || !newPassw) {
      setMessage("Empty field")
    } else if (newPassw.length > 6) {
      setMessage("Password must be at least 6 characters long")
    } else {
      conditionsOk = true
    }
    
    return conditionsOk
  }

  return (
    <div className="alter-password center">
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

