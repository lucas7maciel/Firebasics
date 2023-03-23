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
    const confPasw = this.state.confPaswVal

    if (pasw != confPasw) {
      return this.setState({message: "Senhas não conferem"})
    } else if (!this.emailIsValid(email)) {
      return this.setState({message: "Email inválido"})
    }

    createUserWithEmailAndPassword(auth, email, pasw)
    .then((userCredential) => {
      this.setState({message: "Usuário criado com sucesso"})

      const user = userCredential.user;
    })
    .catch((error) => {
      this.setState({message: "Erro ao criar usuário"})

      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage)
    });

  }
  
  emailIsValid(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }

    return false
  }

  render() {
    return(
    <div style={{margin: "0 auto"}}>
    <div style={{marginLeft: 50, textAlign: 'center'}}>
      <h1>Cadastro</h1>
      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input><br></br>
        <input type="text" placeholder='Confirmar senha' value={this.state.confPaswVal} onChange={evt => this.updateInput(evt, "confPaswVal")}></input>
      </form>
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <button type="button" onClick={() => this.signUp()}>Cadastrar</button>
        <Link to={"/"}>Voltar</Link>
        <p>{this.state.message}</p>
      </div>
    </div>
    </div>
    )
  }
}

export default SignUp