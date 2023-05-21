import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { formatCreatedAt, formatLastLogin } from "../../functions/formatDates";

import { AlterDescription } from "./alterDescription";
import { useNavigate } from "react-router-dom";
import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";
import { AlterName } from "./alterName";
import { AccountInfo } from "./accountInfo";
import VerifyEmail from "./verifyEmail";
import {WindowPopUp} from "../../components/windowPopUp";

import noPicture from "../../assets/no_picture.jpg"
import "./page.css"

export const Profile = () => {
  const [message, setMessage] = useState("Welcome to your profile page")
  const [user, setUser] = useState(getAuth().currentUser)

  //user information displayed on the screen
  const [infoLoaded, setInfoLoaded] = useState(false)

  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)

  const [loggedTimes, setLoggedTimes] = useState(0)
  const [lastLogin, setLastLogin] = useState("")
  const [createdAt, setCreatedAt] = useState("")

  const accountInfo = {loggedTimes, lastLogin, createdAt }

  const [aboutMe, setAboutMe] = useState("")

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
      registerLogin()
        .then(() => loadInfo())
    }
  }, [user])

  useEffect(() => {
    //If a pop-up has been closed and some information has changed
    //it is dynamically updated
    if (!windowActive && infoLoaded) {
      loadInfo()
    }
  }, [windowActive])

  async function loadInfo() {
    setEmailVerified(user.emailVerified)
    setEmail(user.email)
    setPhotoUrl(user.photoURL)
    setDisplayName(user.displayName || "(No Name)")

    await getAccountInfo()

    setInfoLoaded(true)
  }

  async function getAccountInfo() {
    const docRef = doc(getFirestore(), "account-data", user.email)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return
    
    const data = docSnap.data()

    //"Last Login" is read on registerLogin()
    //so it only changes when the session ends
    setAboutMe(data.aboutMe)
    setLoggedTimes(data.loggedTimes)
    setCreatedAt(data.createdAt)
  }

  async function registerLogin() {
    const docRef = doc(getFirestore(), "account-data", user.email)
    const docSnap = await getDoc(docRef)
    const docData = docSnap.data()

    if (!docData?.loggedTimes || !docData?.lastLogin) {
      uploadAccountInfo()
      return
    }
  
    const loggedTimes = ++docData.loggedTimes
    const lastLogin = formatLastLogin(new Date())

    updateDoc(docRef, {loggedTimes, lastLogin})
    setLastLogin(docData.lastLogin)
  }

  function uploadAccountInfo() {
    //gets the last login value from Firebase's user data
    const lastTimeStamp = parseInt(user.metadata.lastLoginAt)
    const lastLogin = formatLastLogin(new Date(lastTimeStamp))

    setLastLogin(lastLogin)

    //gets user data and stores it
    const createdAtTsp = parseInt(user.metadata.createdAt)
    const createdAt = formatCreatedAt(new Date(createdAtTsp))

    const newData = {
      loggedTimes: 1,
      lastLogin: formatLastLogin(new Date()),
      createdAt 
    }

    setDoc(docRef, newData, {merge: true})
      .catch(error => {
        setMessage(error.message)
      })
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
      
      <WindowPopUp 
        content={windowContent} 
        active={windowActive} 
        setActive={setWindowActive} 
      />

      <div className="profile-data">
        <h1>Profile Page</h1>
        <img 
          src={photoUrl || noPicture} 
          onClick={() => setWindowPopUp(<AccountInfo info={accountInfo} />)}
          alt="Profile picture" 
        />
        <h4>{displayName}</h4>
        <VerifyEmail 
          verified={emailVerified}
          setMessage={setMessage}
        />
        <div className="aboutMe">
          <span>{aboutMe || "(No 'About Me')"}</span>
        </div>
      </div>

      <hr className="mainHr" />

      <div className="options">
        <div className="option">
          <button 
            type="button" 
            onClick={() => 
            setWindowPopUp(<AlterDescription email={email} />)}
            >Alter Description
          </button>
        </div>

        <div className="option">
          <button 
            type="button" 
            onClick={() => 
            setWindowPopUp(<AlterName />)}
            >Alter Name
          </button>
        </div>
        
        <div className="option">
          <button 
            type="button"
            onClick={() => setWindowPopUp(<AlterPicture pictureUrl={photoUrl} email={email} />)}
            >Alter Picture
          </button>
        </div>
        
        <div className="option">
          <button 
            type="button" 
            onClick={() => setWindowPopUp(<AlterPassword  />)}
            >Alter Password
          </button>
        </div>
      </div>

      <p className="message">{message}</p>
      </div>
    </div>
  )
}
