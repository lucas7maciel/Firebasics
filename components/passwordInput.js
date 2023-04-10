import { useState } from "react"
import { mainColor } from "../functions/stylePatterns"

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false)
  const [onFocus, setOnFocus] = useState(false)

  return (
    <div style={onFocus ? {...containerStyle, ...focusStyle} : containerStyle}>
      <input 
        style={{...childStyle, outline: "none", flex: "1 1 auto"}}
        type={visible ? "text" : "password"} 
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        placeholder={props.placeHolder || null}
        value={props.Value || ""} 
        onChange={props.changeValue ? evt => props.changeValue(evt.target.value) : null}
      />
      
      <img 
        style={{...childStyle, flex: "0 1 auto"}}
        src={visible ? "https://cdn-icons-png.flaticon.com/512/4264/4264841.png" : "https://cdn-icons-png.flaticon.com/512/7103/7103363.png"}
        onClick={() => setVisible(!visible)}
        alt="Visible"
      />
    </div>
  )
}

const containerStyle = {
  display: "flex",
  alignItems: "center",

  backgroundColor: "white",

  border: "solid",
  borderColor: "gray",
  borderRadius: 4,
  borderWidth: 2,

  width: "100%",
  height: 34
}

const focusStyle = {
  borderColor: mainColor
}

const childStyle = {
  height: 30,
  border: "none"
}


export default PasswordInput

//visible
//https://cdn-icons-png.flaticon.com/512/4264/4264841.png

//not visible
//https://cdn-icons-png.flaticon.com/512/7103/7103363.png