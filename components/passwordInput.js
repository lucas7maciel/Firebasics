import { useState } from "react"

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <input 
      type={visible ? "password" : "text"} 
      placeholder={props.placeholder || null}
      value={props.value || ""} 
      onChange={props.changeValue ? evt => props.changeValue(evt.target.value) : null}
      />
      
      <img 
      style={imgStyle}
      src={visible ? "https://cdn-icons-png.flaticon.com/512/7103/7103363.png" : "https://cdn-icons-png.flaticon.com/512/4264/4264841.png"}
      onClick={() => setVisible(!visible)}
      alt="Visible"
      />
    </div>
  )
}

const imgStyle = {
  height: 30
}

export default PasswordInput

//visible
//https://cdn-icons-png.flaticon.com/512/4264/4264841.png

//not visible
//https://cdn-icons-png.flaticon.com/512/7103/7103363.png