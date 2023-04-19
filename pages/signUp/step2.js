import { Component } from "react"
import { ImagePicker } from "../../components/imagePicker"

export class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: "",
      aboutMe: ""
    }
  }

  getData() {
    return {
      picture: this.state.picture,
      aboutMe: this.state.aboutMe
    }
  }

  checkConditions() {
    if (this.state.picture && !this.state.picture.type.includes("image")) {
      this.props.setMessage("O arquivo deve ser uma imagem")
      return false
    }

    return true
  }

  render() {
    return (
    <div className="step">
      <div>
        <ImagePicker 
          picture={this.state.picture}
          changePicture={(newPic) => this.setState({picture: newPic})}
        />

        <hr />

        <label className="aboutMe-label" htmlFor="aboutMe">About me</label><br/>
        <textarea 
          rows="4" columns="25" 
          value={this.state.aboutMe} 
          onChange={evt => this.setState({aboutMe: evt.target.value})} 
        />
      </div>
    </div>
  )}
} 
