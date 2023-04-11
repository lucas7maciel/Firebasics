import { useEffect, useState } from "react"
import closeIcon from "../assets/closeIcon.png"

const WindowPopUp = (props) => {
  const [startTransition, setStartTransition] = useState(false)

  useEffect(() => {
    if (props.active) {
      setStartTransition(() => true)
    }
  }, [props.active])

  return props.active ? (
    <div style={windowStyle}>
      <div style={startTransition ? {...contentStyle, ...animation} : contentStyle}>
        <img
          src={closeIcon}
          style={buttonStyle}
          onClick={() => {
            props.setActive(() => false)
            setStartTransition(() => false)
          }}
         />

        {props.content}
    </div>
    </div>
  ) : null
}

const windowStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 3,

  width:'100%',
  height: '100%',

  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  border: 'solid gray'
}

const contentStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -75%)',
  zIndex: 4,

  display: 'flex',
  flexDirection: 'column',

  alignItems: 'flex-end',

  opacity: '20%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 35
}

const animation = {
  opacity: "100%",
  top: "50%",
  transform: 'translate(-50%, -50%)',

  transition: "opacity 0.3s ease-out, transform 0.3s ease-out"
}

const buttonStyle = {
  textAlign: 'right',
  cursor: "pointer",
  marginBottom: 25,
  maxHeight: 20,
  maxWidth: 20
}


export default WindowPopUp