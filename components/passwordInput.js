import { useState } from "react"
import visibleIcon from "../assets/visibleIcon.png"
import invisibleIcon from "../assets/invisibleIcon.png"
import "./passwordInput.css"

export const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false)
  const [onFocus, setOnFocus] = useState(false)

  return (
    <div className={`password-input ${onFocus ? "focused" : ""}`}>
      <input
        type={visible ? "text" : "password"} 
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        placeholder={props.placeHolder || null}
        value={props.Value || ""} 
        onChange={props.changeValue ? 
          evt => props.changeValue(evt.target.value) : null
        }
      />
      
      <img 
        src={visible ? visibleIcon : invisibleIcon}
        onClick={() => setVisible(!visible)}
        alt="Visible"
      />
    </div>
  )
}
