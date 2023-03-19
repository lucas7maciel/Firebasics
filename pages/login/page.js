import { Component } from "react"

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loginText: "Login",
      signUpText: "Sign Up"
    }
  }

  render() {
  return (
  <div style={{display: "flex"}}>
    <div style={{marginLeft: 50}}>
      <p>Cadastro</p>
      <form>
        <input type="text" placeholder='Login'></input><br></br>
        <input type="text" placeholder='Senha'></input><br></br>
        <input type="text" placeholder='Confirmar senha'></input>
      </form>
      <button>Cadastrar</button>
      <p>{this.state.signUpText}</p>
    </div>
    <div style={{marginLeft: 50}}>
      <p>Login</p>
      <form>
        <input type="text" placeholder='Login'></input><br></br>
        <input type="text" placeholder='Senha'></input>
      </form>
      <button>Entrar</button>
      <p>{this.state.loginText}</p>
    </div>
    </div>
    )
  }
}

export default Login
