import { useState } from "react"
import { mainColor } from "../functions/stylePatterns"
import "./passwordInput.css"

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false)
  const [onFocus, setOnFocus] = useState(false)

  return (
    <div className={`container ${onFocus ? "focused" : ""}`}>
      <input 
        className="child input"
        type={visible ? "text" : "password"} 
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        placeholder={props.placeHolder || null}
        value={props.Value || ""} 
        onChange={props.changeValue ? evt => props.changeValue(evt.target.value) : null}
      />
      
      <img 
        className="child icon"
        src={visible ? "https://cdn-icons-png.flaticon.com/512/4264/4264841.png" : "https://cdn-icons-png.flaticon.com/512/7103/7103363.png"}
        onClick={() => setVisible(!visible)}
        alt="Visible"
      />
    </div>
  )
}

export default PasswordInput

//visible
//https://cdn-icons-png.flaticon.com/512/4264/4264841.png

//not visible
//https://cdn-icons-png.flaticon.com/512/7103/7103363.png