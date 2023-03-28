import { useState, forwardRef, useImperativeHandle } from "react"
import PasswordInput from "../../components/passwordInput"

const Step1 = forwardRef((props, ref) => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")

  useImperativeHandle(ref, () => ({
    getData: getData
  }));

  function verify() {
    if (!emailIsValid(email)) {
      return console.log("Email inválido")
    }

    if (password.length < 6 || password.length > 12) {
      return console.log("Senha deve ter de 6 a 12 caracteres")
    }

    if (password != confPassword) {
      return console.log("Senhas não conferem")
    }
  }

  function getData() {
    return {
      email: email,
      password: password,
      displayName: displayName
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

      <img 
      style={{maxHeight: 300, maxWidth: 300}}
      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      alt="Foto de perfil"
      />

      <form style={{display: 'flex', flexDirection: 'column'}}>
        <input type="text" placeholder="Display Name" value={displayName} onChange={evt => setDisplayName(evt.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={evt => setEmail(evt.target.value)} />
        <PasswordInput placeholder="Password" value={password} changeValue={setPassword} />
        <PasswordInput placeholder="Confirm password" value={confPassword} changeValue={setConfPassword} />
      </form>
    </div>
  )
})

 export default Step1