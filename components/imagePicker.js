import { Component, createRef } from "react"
import "./imagePicker.css"
import editIcon from "../assets/editIcon.png"
import noPicture from "../assets/no_picture.jpg"

export class ImagePicker extends Component {
  constructor(props) {
    super(props)

    this.state = {hoveringImage: false}
    this.filePicker = createRef()
  }

  render() {
    return (
    <div 
    className="overlay-container"
    onMouseEnter={() => this.setState({hoveringImage: true})} 
    onMouseLeave={() => this.setState({hoveringImage: false})}
    >
      <img
      id="picture"
      src={
        (typeof(this.props.picture) === "object" ? 
          URL.createObjectURL(this.props.picture) : this.props.picture) || noPicture
      } 
      />

      <div
      id="edit"
      onClick={() => this.filePicker.current?.click()}
      >
        <img 
        src={editIcon}
        />
      </div>

      <input
      id="refInput"
      type="file" ref={this.filePicker} 
      onChange={evt => this.props.changePicture(evt.target.files[0])} 
      />
    </div>
    )
  }
}
