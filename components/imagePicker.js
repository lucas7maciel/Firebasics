import { Component, createRef } from "react"
import editIcon from "../assets/editIcon.png"
import noPicture from "../assets/no_picture.jpg"
import "./imagePicker.css"

export class ImagePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {isFile: this.isFile()}
    this.filePicker = createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.picture === this.props.picture) return
    
    this.setState({
      isFile: this.isFile()
    })
  }

  isFile() {
    if (this.props.picture && typeof(this.props.picture) === "object") {
      return true
    }

    return false
  }

  render() {
    return (
    <div className="overlay-container">
      <img className="picture"
        src={
          (this.state.isFile ? 
            URL.createObjectURL(this.props.picture) : this.props.picture || noPicture) 
        } 
      />

      <div className="edit"
        onClick={() => this.filePicker.current?.click()}
      >
        
        <img src={editIcon} />
      </div>

      <input className="refInput"
        type="file" 
        accept="image/*"
        ref={this.filePicker} 
        onChange={evt => this.props.changePicture(evt.target.files[0])} 
      />
    </div>
    )
  }
}
