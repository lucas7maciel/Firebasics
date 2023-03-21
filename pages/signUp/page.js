import {Component} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";

import {auth} from '../../functions/firebase'
import { signUpError } from '../../functions/handle-errors';

import { Link } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: "Cadastro",
      loginVal: "",
      paswVal: "",
      confPaswVal: ""
    }
  }

  updateInput(event, stateKey) {
    this.setState({[stateKey]: event.target.value})
  }

  signUp() {
    const email = this.state.loginVal
    const pasw = this.state.paswVal

    createUserWithEmailAndPassword(auth, email, pasw)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logado")
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Erro mensagem: ${errorMessage}`)
      console.log(error)
    });
    console.log("Acabou")
  }
  

  render() {
    return(
    <div style={{marginLeft: 50}}>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input><br></br>
        <input type="text" placeholder='Confirmar senha' value={this.state.confPaswVal} onChange={evt => this.updateInput(evt, "confPaswVal")}></input>
      </form>
      <button type="button" onClick={() => this.signUp()}>Cadastrar</button>
      <Link to={"/"}>Voltar</Link>
      <p>{this.state.message}</p>
    </div>
    )
  }
}

export default SignUp