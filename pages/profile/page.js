import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";
import { AlterName } from "./alterName";
import { AccountInfo } from "./accountInfo";
import VerifyEmail from "./verifyEmail";
import {WindowPopUp} from "../../components/windowPopUp";
import noPicture from "../../assets/no_picture.jpg"
import "./page.css"
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { AlterDescription } from "./alterDescription";

export const Profile = () => {
  const [message, setMessage] = useState("Welcome to your profile page")
  const [user, setUser] = useState(getAuth().currentUser)

  //user information displayed on the screen
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [email, setEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [accountInfo, setAccountInfo] = useState({})
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
    console.log(user)

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

  async function loadInfo() {
    setEmailVerified(user.emailVerified)
    setEmail(user.email)
    setPhotoUrl(user.photoURL)
    setDisplayName(user.displayName || "(No Name)")

    getAboutMe()
    await getAccountInfo()
    registerLogin()

    setInfoLoaded(true)
  }

  async function getAboutMe() {
    const docRef = doc(getFirestore(), "about-me", user.email)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setAboutMe(docSnap.data().aboutMe)
    }
  }

  async function getAccountInfo() {
    const docRef = doc(getFirestore(), "account-data", user.email)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setAccountInfo(docSnap.data())
      return
    }

    const docData = {
      loggedTimes: 1,
      lastLogin: new Date().toJSON().slice(0, 10),
      accountCreatedIn: "No Info"
    }

    setDoc(docRef, docData)
  }

  async function registerLogin() {
    const docRef = doc(getFirestore(), "account-data", user.email)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return

    let loggedTimes = docSnap.data().loggedTimes

    updateDoc(docRef, {
      loggedTimes: loggedTimes + 1,
      lastLogin: new Date().toJSON().slice(0, 10)
    }).catch(error => {
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
