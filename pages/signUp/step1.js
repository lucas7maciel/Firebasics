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
      <h1 className="step-title">Dados pessoais</h1>

      <form style={{display: 'flex', flexDirection: 'column', alignItems: "start"}}>
        <label htmlFor="displayName">Display Name</label>
        <input type="text" placeholder="Display Name" id="displayName" value={this.state.displayName} onChange={evt => this.setState({displayName: evt.target.value})} />

        <label style={{marginTop: 5}} htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" value={this.state.email} onChange={evt => this.setState({email: evt.target.value})} />

        <label style={{marginTop: 5}} htmlFor="password">Password</label>
        <PasswordInput placeholder="Password" id="password" Value={this.state.password} changeValue={null} />

        <label style={{marginTop: 5}} htmlFor="confPassword">Confirm Password</label>
        <PasswordInput placeholder="Confirm password" id="confPassword" Value={this.state.confPassword} changeValue={null} />
      </form>
    </div>
    )
  }
}
