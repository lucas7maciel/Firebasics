import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import VerifyEmail from "./verifyEmail";
import WindowPopUp from "../../components/windowPopUp";
import { pageStyle, containerStyle, buttonStyle, mainColor, secondaryColor } from "../../functions/stylePatterns";
import { AlterPicture } from "./alterPicture";
import { AlterPassword } from "./alterPassword";
import { AlterName } from "./alterName";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

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

  function getDescription() {
    const descriptionRef = ref(getStorage(), `users/${user.email}/about_me.txt`)

    console.log("Pegando descrição")

    /*getDownloadURL(descriptionRef)
      .then(url => {
        const xhttp = new XMLHttpRequest()

        xhttp.open("GET", url, true);
        xhttp.send();

        xhttp.onreadystatechange = () => {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response)
          }
        }
      })

      .catch(error => console.log(error))*/
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
    <div style={pageStyle}>
      <button 
          style={{backgroundColor: secondaryColor, color: mainColor, border: "none", padding: 9, borderRadius: 4, position: 'absolute', right: 10, top: 20}}
          type="button"
          onClick={() => signOut()}
          >Exit
      </button>
    <div style={containerStyle}>
      <WindowPopUp content={windowContent} active={windowActive} setActive={setWindowActive} />

      <div style={{position: 'flex', flexDirection: 'column'}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1>Profile Page</h1>
          <img src={photoUrl} alt="Profile picture" style={{objectFit: "cover", width: 150, height: 150}} />
          <h4>{displayName}</h4>
          <h4>{email}</h4>
          <VerifyEmail verified={emailVerified} changeMessage={setMessage} />
        </div>

        <hr style={{marginBottom: 15, width: "70%", textAlign: "center"}}></hr>

        <div style={{display: 'flex', width: "65%", margin: "0 auto"}}>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
            <button style={buttonStyle} type="button" onClick={() => setWindowPopUp(<AlterName />)}>Alter Name</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}>
          <button style={buttonStyle} type="button" onClick={() => setWindowPopUp(<AlterPicture pictureUrl={photoUrl} email={email} />)}>Alter Picture</button>
          </div>
          <div style={{flex: 1, flexDirection: 'column', textAlign: 'center'}}> 
            <button style={buttonStyle} type="button" onClick={() => setWindowPopUp(<AlterPassword  />)}>Alter Password</button>
          </div>
        </div>

        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{message}</p>
        </div>
      </div>
      </div>
  )
}

export default Profile