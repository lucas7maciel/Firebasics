import { Component, createRef } from "react"
import editIcon from "../assets/editIcon.png"
import noPicture from "../assets/no_picture.jpg"
import "./imagePicker.css"

export class ImagePicker extends Component {
  constructor(props) {
    super(props)

    this.filePicker = createRef()
  }

  render() {
    return (
    <div className="overlay-container">
      <img className="picture"
        src={
          (typeof(this.props.picture) === "object" ? 
            URL.createObjectURL(this.props.picture) : this.props.picture) || noPicture
        } 
      />

      <div className="edit"
        onClick={() => this.filePicker.current?.click()}
      >
        
        <img src={editIcon} />
      </div>

      <input className="refInput"
        type="file" 
        ref={this.filePicker} 
        onChange={evt => this.props.changePicture(evt.target.files[0])} 
      />
    </div>
    )
  }
}
