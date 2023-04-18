import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getBytes, getDownloadURL, getStorage, getStream, ref } from "firebase/storage";

import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";
import { AlterName } from "./alterName";
import VerifyEmail from "./verifyEmail";
import {WindowPopUp} from "../../components/windowPopUp";

import "../../functions/styles.css"
import "./style.css"


const Profile = () => {
  const [user, setUser] = useState(getAuth().currentUser)

  if (!user) {
    getAuth().onAuthStateChanged(user => setUser(user))
  }

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [message, setMessage] = useState("")

  //window pop up
  const [windowContent, setWindowContent] = useState()
  const [windowActive, setWindowActive] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    const keepLogged = localStorage.getItem("keepLogged")

    if(keepLogged && keepLogged !== user.email) {
      signOut()
    } else if (!infoLoaded) {
      loadInfo()
    }
  }, [user])

  useEffect(() => {
    if (!windowActive && infoLoaded) {
      loadInfo()
    }
  }, [windowActive])

  function loadInfo() {
    setEmailVerified(user.emailVerified)
    setEmail(user.email)
    setPhotoUrl(user.photoURL) //CAMINHO PARA "SEM FOTO"
    setDisplayName(user.displayName || "(Sem nome)")

    setInfoLoaded(true)

    getDescription()
  }

  async function getDescription() {
    const descriptionRef = ref(getStorage(), `users/${user.email}/about_me.txt`)

    console.log("Pegando descrição")

    //const url = await getDownloadURL(descriptionRef)
  }

  function setWindowPopUp(content) {
    setWindowContent(() => content)
    setWindowActive(() => true)
  }

  function signOut() {
    window.localStorage.removeItem("keepLogged")
    navigate("/")
  }

  return (
    <div className="page">
      <button 
          className="exit-button"
          type="button"
          onClick={() => signOut()}
          >Exit
      </button>
    <div className="content">
      <WindowPopUp content={windowContent} active={windowActive} setActive={setWindowActive} />

      <div className="profile-data">
        <h1>Profile Page</h1>
        <img src={photoUrl} alt="Profile picture" />
        <h4>{displayName}</h4>
        <h4>{email}</h4>
        <VerifyEmail verified={emailVerified} changeMessage={setMessage} />
      </div>

      <hr id="mainHr" />

      <div className="options">
        <button type="button" onClick={() => setWindowPopUp(<AlterName />)}>Alter Name</button>
        <button type="button" onClick={() => setWindowPopUp(<AlterPicture pictureUrl={photoUrl} email={email} />)}>Alter Picture</button>
        <button type="button" onClick={() => setWindowPopUp(<AlterPassword  />)}>Alter Password</button>
      </div>

      <p className="message">{message}</p>
      </div>
    </div>
  )
}

export default Profile