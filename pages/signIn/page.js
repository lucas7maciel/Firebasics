import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Link, Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";

const SignIn = () => {
  const [message, setMessage] = useState("")
  const [loginVal, setLoginVal] = useState("lucas@gmail.com")
  const [paswVal, setPaswVal] = useState("123456")

  const auth = getAuth()
  const navigate = useNavigate()

  function updateInput(event, changeState) {
    const newValue = event.target.value
    changeState(newValue)
  }

  function login() {
    signInWithEmailAndPassword(auth, loginVal, paswVal)
    .then((userCredential) => {
      setMessage("User logado")

      const user = userCredential.user;
      navigate("profile")
    })
    .catch((error) => {
      setMessage("Erro ao logar")

      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  return (
    <div style={{margin: "0 auto"}}>
    <div style={{marginLeft: 50, textAlign: 'center'}}>
      <h1>Login</h1>

      <form>
        <input type="text" placeholder='Login' value={loginVal} onChange={evt => updateInput(evt, setLoginVal)}></input><br></br>
        <input type="text" placeholder='Senha' value={paswVal} onChange={evt => updateInput(evt, setPaswVal)}></input>
      </form>
  
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <Link to={"/recoverPasw"}>Esqueci a senha</Link>
        <button type="button" onClick={() => login()}>Entrar</button>
        <Link to={"/signUp"}>Cadastrar</Link>
        <p>{message}</p>
      </div>
    </div>
    </div>
  )
}

/*class SignIn extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      message: "Login",
      loginVal: "",
      paswVal: "",

      redirect: ""
    }
  }

  updateInput(event, stateKey) {
    const newValue = event.target.value
    this.setState({[stateKey]: newValue})
  }

  login() {
    const login = this.state.loginVal
    const pasw = this.state.paswVal

    signInWithEmailAndPassword(auth, login, pasw)
    .then((userCredential) => {
      this.setState({message: "User logado"})

      const user = userCredential.user;
      console.log(user)
    })
    .catch((error) => {
      this.setState({message: "Erro ao logar"})

      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }

  render() {
  return (
    <>
    <div style={{marginLeft: 50, textAlign: 'center'}}>
      <h1>Login</h1>

      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input>
      </form>
  
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <button type="button" onClick={() => this.login()}>Entrar</button>
        <Link to={"/signUp"}>Cadastrar</Link>
        <p>{this.state.message}</p>
        <Link to={""}>Teste</Link>
      </div>
    </div>
    </>
    )
  }
}*/

export default SignIn