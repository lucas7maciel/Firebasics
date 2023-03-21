import {Component} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../functions/firebase'
import { changePage } from '../../functions/router-dom';

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

  signUp(email, password) {
    console.log("Começou")
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logado")
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Erro: ${error.message}`)
    });
    console.log("Acabou")
  }
  

  render() {
    return(
    <div style={{marginLeft: 50}}>
      <p>Cadastro</p>
      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input><br></br>
        <input type="text" placeholder='Confirmar senha' value={this.state.confPaswVal} onChange={evt => this.updateInput(evt, "confPaswVal")}></input>
      </form>
      <button type="button" onClick={/*this.signUp(this.state.loginVal, this.state.paswVal)*/console.log("Clicou")}>Cadastrar</button>
      <button type="button" onClick={/*changePage("/")*/console.log("Teste")}>Voltar</button>
      <p>{this.state.message}</p>
    </div>
    )
  }
}

export default SignUp