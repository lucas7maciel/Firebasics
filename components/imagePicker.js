import { useState, useRef } from "react"
import editIcon from "../assets/editIcon.png"

export const ImagePicker = (props) => {
  const [hoveringImage, setHoveringImage] = useState(false)
  const filePicker = useRef()

  return (
    <div 
    style={{display: "grid", height: 150, width: 150, margin: "0 auto"}}
    onMouseEnter={() => setHoveringImage(true)} 
    onMouseLeave={() => setHoveringImage(false)}
    >
      <img 
      style={gridOverlay}
      src={typeof(props.picture) === "object" ? URL.createObjectURL(props.picture) : props.picture} 
      />

      <div
      style={hoveringImage ? {...gridOverlay, ...{backgroundColor: "rgba(0,0,0,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}} : {display: "none"}}
      onClick={() => filePicker.current?.click()}
      >
        <img 
        style={{width:70, height: 70}}
        src={editIcon}
        />
      </div>

      <input
      style={{display: "none"}} 
      type="file" ref={filePicker} 
      onChange={evt => props.changePicture(evt.target.files[0])} 
      />
    </div>
  )
}

const gridOverlay = {
  gridRowStart: 1,
  gridColumnStart: 1,
  placeSelf: "center",

  objectFit: "cover", 
  height: 150, 
  width: 150
}
