import { Component, createRef } from "react"
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
    style={{display: "grid", height: 150, width: 150, margin: "0 auto"}}
    onMouseEnter={() => this.setState({hoveringImage: true})} 
    onMouseLeave={() => this.setState({hoveringImage: false})}
    >
      <img 
      style={gridOverlay}
      src={
        (typeof(this.props.picture) === "object" ? 
          URL.createObjectURL(this.props.picture) : this.props.picture) || noPicture
      } 
      />

      <div
      style={this.state.hoveringImage ? {...gridOverlay, ...{backgroundColor: "rgba(0,0,0,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}} : {display: "none"}}
      onClick={() => this.filePicker.current?.click()}
      >
        <img 
        style={{width:70, height: 70}}
        src={editIcon}
        />
      </div>

      <input
      style={{display: "none"}} 
      type="file" ref={this.filePicker} 
      onChange={evt => this.props.changePicture(evt.target.files[0])} 
      />
    </div>
    )
  }
}

const gridOverlay = {
  gridRowStart: 1,
  gridColumnStart: 1,
  placeSelf: "center",

  objectFit: "cover", 
  height: 150, 
  width: 150
}
