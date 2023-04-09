import { useState } from "react"

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false)
  const [onFocus, setOnFocus] = useState(false)

  return (
    <div style={onFocus ? {...containerStyle, ...focusStyle} : containerStyle}>
      <input 
        style={{...childStyle, outline: "none"}}
        type={visible ? "password" : "text"} 
        onFocus={() => setOnFocus(true)}
        onBlur={() => setOnFocus(false)}
        placeholder={props.placeHolder || null}
        value={props.Value || ""} 
        onChange={props.changeValue ? evt => props.changeValue(evt.target.value) : null}
      />
      
      <img 
        style={{...childStyle}}
        src={visible ? "https://cdn-icons-png.flaticon.com/512/7103/7103363.png" : "https://cdn-icons-png.flaticon.com/512/4264/4264841.png"}
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

  border: "1px solid gray",
  borderRadius: 2,

  width: 205,
  height: 34
}

const focusStyle = {
  outline: "2px solid black"
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