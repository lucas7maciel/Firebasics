import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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

    //"Last Login" is caught in registerLogin()
    //so it only changes when the session ends
    setAboutMe(data.aboutMe)
    setLoggedTimes(data.loggedTimes)
    setCreatedAt(data.createdAt)
  }

  async function registerLogin() {
    const docRef = doc(getFirestore(), "account-data", user.email)
    const docSnap = await getDoc(docRef)

    //pegando o ultimo login antigo pra exibir
    if (docSnap.exists()) {
      setLastLogin(docSnap.data().lastLogin)
    } else {
      let last = new Date(parseInt(user.metadata.lastLoginAt))
      last = `${last.getFullYear()}/${last.getMonth()}/${last.getDate()} ${last.getHours()}:${last.getMinutes()}:${last.getSeconds()}`
      
      setLastLogin(last)
    }

    let loggedTimes = docSnap.data()?.loggedTimes || 0

    let newlast = new Date()
    newlast = `${newlast.getFullYear()}/${newlast.getMonth()}/${newlast.getDate()} ` +
              `${newlast.getHours()}:${newlast.getMinutes()}:${newlast.getSeconds()}`


    let createdAt = docSnap.data()?.createdAt

    if (createdAt) {
      //caso o usuário não tenha o registro de criação
      let date = parseInt(user.metadata.createdAt)
      date = new Date(date)
      
      createdAt = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}` 
    }

    let newData = {
      loggedTimes: loggedTimes + 1,
      lastLogin: newlast,
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
