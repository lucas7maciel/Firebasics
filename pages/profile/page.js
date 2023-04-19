import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";
import { AlterName } from "./alterName";
import VerifyEmail from "./verifyEmail";
import {WindowPopUp} from "../../components/windowPopUp";
import noPicture from "../../assets/no_picture.jpg"
import "./page.css"

export const Profile = () => {
  const [user, setUser] = useState(getAuth().currentUser)

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

  if (!user) {
    getAuth().onAuthStateChanged(user => setUser(user))
  }

  useEffect(() => {
    //If the user has checked the "Keep logged" option 
    //and has entered the site again
    if (!user) return

    const userLogged = localStorage.getItem("keepLogged")

    if(userLogged && userLogged !== user.email) {
      signOut()
    } else if (!infoLoaded) {
      loadInfo()
    }
  }, [user])

  useEffect(() => {
    //If a pop-up has been closed and some information has changed
    //it is dynamically updated
    if (!windowActive && infoLoaded) {
      loadInfo()
    }
  }, [windowActive])

  function loadInfo() {
    setEmailVerified(user.emailVerified)
    setEmail(user.email)
    setPhotoUrl(user.photoURL)
    setDisplayName(user.displayName || "(No Name)")
    //getDescription() working on this

    setInfoLoaded(true)
  }

  function signOut() {
    window.localStorage.removeItem("keepLogged")
    navigate("/")
  }

  function setWindowPopUp(content) {
    setWindowContent(() => content)
    setWindowActive(() => true)
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
      <WindowPopUp 
        content={windowContent} 
        active={windowActive} 
        setActive={setWindowActive} 
      />

      <div className="profile-data">
        <h1>Profile Page</h1>
        <img 
          src={photoUrl || noPicture} 
          alt="Profile picture" 
        />
        <h4>{displayName}</h4>
        <h4>{email}</h4>
        <VerifyEmail 
          verified={emailVerified}
          changeMessage={setMessage}
        />
      </div>

      <hr className="mainHr" />

      <div className="options">
        <button 
          type="button" 
          onClick={() => 
          setWindowPopUp(<AlterName />)}
          >Alter Name
        </button>

        <button 
          type="button"
          onClick={() => setWindowPopUp(<AlterPicture pictureUrl={photoUrl} email={email} />)}
          >Alter Picture
        </button>

        <button 
          type="button" 
          onClick={() => setWindowPopUp(<AlterPassword  />)}
          >Alter Password
        </button>
      </div>

      <p className="message">{message}</p>
      </div>
    </div>
  )
}
