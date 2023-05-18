import { useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const AlterName = () => {
  const [message, setMessage] = useState("Enter the new name in the input")
  const [displayName, setDisplayName] = useState("")

  function changeName() {
    if (!checkName()) return

    setMessage("Changing name")

    const user = getAuth().currentUser

    updateProfile(user, {displayName: displayName})
      .then(() => {
        setMessage("Name has been changed")

        //update display name at firestore
        const docRef = doc(getFirestore(), "about-me", user.email)
        const docData = {
          user: [user.email, displayName]
        }

        setDoc(docRef, docData, {merge: true})
      })
      .catch(error => {
        setMessage(`Error while changing name:\n${error.message}`)
      })
  }

  function checkName() {
    if (!displayName) {
      setMessage("Empty name")
      return false
    }

    return true
  }

  return (
    <div className="alter-name center">
      <h3>Change Name</h3>
      <input value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
      <p className="message">{message}</p>
      <button type="button" onClick={() => changeName()}>Alter Name</button>
    </div>
  )
}
