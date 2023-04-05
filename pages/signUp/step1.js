import { useState, forwardRef, useImperativeHandle } from "react"
import PasswordInput from "../../components/passwordInput"

import { ImagePicker } from "../../components/imagePicker"

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
    <div>
      <h1>Dados pessoais</h1>

      <ImagePicker picture={profilePic} changePicture={setProfilePic} />

      <form style={{display: 'flex', flexDirection: 'column'}}>
        <input type="text" placeholder="Display Name" value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={evt => setEmail(evt.target.value)} />
        <PasswordInput placeholder="Password" Value={password} changeValue={setPassword} />
        <PasswordInput placeholder="Confirm password" Value={confPassword} changeValue={setConfPassword} />
      </form>
    </div>
  )
})

 export default Step1