import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react"
import PasswordInput from "../../components/passwordInput"

const Step1 = forwardRef((props, ref) => {
  const [profilePic, setProfilePic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
  const [displayName, setDisplayName] = useState("Luquinhas")
  const [email, setEmail] = useState("a@gmail.com")
  const [password, setPassword] = useState("123123123")
  const [confPassword, setConfPassword] = useState("123123123")

  useImperativeHandle(ref, () => ({
    verify: verify,
    getData: getData
  }));

  function verify() {
    if (!emailIsValid(email)) {
      console.log("Email inválido")
      return false
    }

    if (password.length < 6 || password.length > 12) {
      console.log("Senha deve ter de 6 a 12 caracteres")
      return false
    }

    if (password != confPassword) {
      console.log("Senhas não conferem")
      return false
    }

    return true
  }

  function getData() {
    return {
      email: email,
      password: password,
      displayName: displayName,
      profilePic: profilePic
    }
  }

  function emailIsValid(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }

    return false
  }

  return (
    <>
    <h1 className="step-title">Dados pessoais</h1>
    <div className="step">

      <form style={{display: 'flex', flexDirection: 'column', alignItems: "start"}}>
        <label htmlFor="displayName">Display Name</label>
        <input type="text" placeholder="Display Name" id="displayName" value={displayName} onChange={evt => setDisplayName(evt.target.value)} />

        <label style={{marginTop: 5}} htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" value={email} onChange={evt => setEmail(evt.target.value)} />

        <label style={{marginTop: 5}} htmlFor="password">Password</label>
        <PasswordInput placeholder="Password" id="password" Value={password} changeValue={setPassword} />

        <label style={{marginTop: 5}} htmlFor="confPassword">Confirm Password</label>
        <PasswordInput placeholder="Confirm password" id="confPassword" Value={confPassword} changeValue={setConfPassword} />
      </form>
    </div>
    </>
  )
})

 export default Step1