import { useState } from "react"

const WindowPopUp = (props) => {
  const [active, setActive] = useState(true)

  function open() {
    setActive(true)
  }

  function close() {
    setActive(false)
  }

  return active ? (
    <div style={windowStyle}>
      <div style={contentStyle}>
        <button type="button" onClick={() => close()}>Fechar</button>
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
  border: 'solid gray',
}

const contentStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 4,

  opacity: '100%',
  backgroundColor: 'green'
}

const buttonStyle = {
  textAlign: 'right'
}


export default WindowPopUp