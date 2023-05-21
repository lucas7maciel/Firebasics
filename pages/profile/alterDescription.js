import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useState } from "react"

export const AlterDescription = (props) => {
  const [aboutMe, setAboutMe] = useState("")
  const [message, setMessage] = useState("Enter the new description")

  function change() {
    setMessage("Changing description...")
    const docRef = doc(getFirestore(), `account-data/${props.email}`)

    setDoc(docRef, {aboutMe}, {merge: true})
      .then(() => {
        setMessage("Description changed!")
      })
      .catch((error) => {
        setMessage(error.message)
      })
  }

  return (
    <div className="alter-description center">
      <h3>Change Description</h3>

      <textarea 
        className="about-me"
        rows="5" columns="30" 
        maxLength={150} 
        value={aboutMe}
        onChange={evt => setAboutMe(evt.target.value)}
        onKeyDown={evt => {
          if (evt.key === "Enter") {
            change()
          }
        }}
      />

      <p className="message">{message}</p>

      <button 
        type="button" 
        onClick={() => change()}
        >Alter Description
      </button>
    </div>
  )
}