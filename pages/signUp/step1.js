import { Component } from "react"
import { emailIsValid } from "../../functions/emailIsValid"
import {PasswordInput} from "../../components/passwordInput"

export class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "Luquinhas",
      email: "a@gmail.com",
      password: "123123123",
      confPassword: "123123123"
    }
  }

  getData() {
    return {
      email: this.state.email,
      password: this.state.password,
      displayName: this.state.displayName
    }
  }

  checkConditions() {
    let conditionsOk = false

    if (!this.state.email || !this.state.password || !this.state.confPassword) {
      this.props.setMessage("Campos obrigatórios vazios")
    }

    else if (!emailIsValid(this.state.email)) {
      this.props.setMessage("Email inválido")
    }

    else if (this.state.password.length < 6 || this.state.password.length > 12) {
      this.props.setMessage("Senha deve ter de 6 a 12 caracteres")
    }

    else if (this.state.password !== this.state.confPassword) {
      this.props.setMessage("Senhas não conferem")
    }

    else {
      conditionsOk = true
    }

    return conditionsOk
  }

  render() {
    return (
      <div className="step">
      <form className="step-form">
        <label htmlFor="displayName">Display Name</label>
        <input 
          type="text" 
          placeholder="Display Name" 
          value={this.state.displayName}
          onChange={evt => this.setState({displayName: evt.target.value})} 
        />

        <label htmlFor="email">Email</label>
        <input 
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={evt => this.setState({email: evt.target.value})} 
        />

        <label htmlFor="password">Password</label>
        <PasswordInput 
          placeholder="Password"
          Value={this.state.password} 
          changeValue={(newValue) => this.setState({password: newValue})} 
        />

        <label htmlFor="confPassword">Confirm Password</label>
        <PasswordInput 
          placeholder="Confirm password"
          Value={this.state.confPassword} 
          changeValue={(newValue) => this.setState({confPassword: newValue})}
        />
      </form>
    </div>
    )
  }
}
