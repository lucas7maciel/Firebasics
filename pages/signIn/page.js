import { Component } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";

import {auth} from '../../functions/firebase'
import { Link } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      message: "Login",
      loginVal: "",
      paswVal: ""
    }
  }

  updateInput(event, stateKey) {
    const newValue = event.target.value
    this.setState({[stateKey]: newValue})
  }

  changePage(route, state={}) {
    if (this.navigator) {
      console.log(this.navigator)
    }
  }

  login() {
    const login = this.state.loginVal
    const pasw = this.state.paswVal

    signInWithEmailAndPassword(auth, login, pasw)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logado")
      console.log(user)
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(`Erro: ${errorMessage}`)
      this.setState({message: `Erro: ${errorMessage}`})
    });
  }

  render() {
  return (
    <>
    <div style={{marginLeft: 50}}>
      <h1>Login</h1>

      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input>
      </form>
  
      <button type="button" onClick={() => this.login()}>Entrar</button>
      <Link to={"/signUp"}>Cadastrar</Link>
      <p>{this.state.message}</p>
    </div>
    </>
    )
  }
}

export default SignIn