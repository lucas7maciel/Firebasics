import { Component } from "react"
import { emailIsValid } from "../../functions/emailIsValid"
import {PasswordInput} from "../../components/passwordInput"

export class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confPassword: ""
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
      this.props.setMessage("Empty required fields")
    }

    else if (!emailIsValid(this.state.email)) {
      this.props.setMessage("Invalid email")
    }

    else if (this.state.password.length < 6) {
      this.props.setMessage("Password must be at least 6 characters long")
    }

    else if (this.state.password !== this.state.confPassword) {
      this.props.setMessage("Passwords do not match")
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

        <label htmlFor="email">*Email</label>
        <input 
          type="text"
          placeholder="Email"
          value={this.state.email}
          onChange={evt => this.setState({email: evt.target.value})} 
        />

        <label htmlFor="password">*Password</label>
        <PasswordInput 
          placeHolder="Password"
          Value={this.state.password} 
          changeValue={(newValue) => this.setState({password: newValue})} 
        />

        <label htmlFor="confPassword">*Confirm Password</label>
        <PasswordInput 
          placeHolder="Confirm password"
          Value={this.state.confPassword} 
          changeValue={(newValue) => this.setState({confPassword: newValue})}
        />
      </form>
    </div>
    )
  }
}
