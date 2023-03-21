import { Component } from "react"
import {signUp, Login} from "../../functions/firebase"
import { changePage } from "../../functions/router-dom"

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
    event.preventDefault()
    const newValue = event.target.value
  
    this.setState({[stateKey]: newValue})
  }

  render() {
  return (
    <div style={{marginLeft: 50}}>
      <p>Login</p>
      <form>
        <input type="text" placeholder='Login' value={this.state.loginVal} onChange={evt => this.updateInput(evt, "loginVal")}></input><br></br>
        <input type="text" placeholder='Senha' value={this.state.paswVal} onChange={evt => this.updateInput(evt, "paswVal")}></input>
      </form>
      <button type="button" onClick={/*Login*/console.log("Botao login")}>Entrar</button>
      <button type="button" onClick={/*changePage("/signUp")*/console.log("Mudar de pagina")}>Sign Up</button>
      <p>{this.state.message}</p>
    </div>
    )
  }
}

export default SignIn
