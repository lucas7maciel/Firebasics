import closeIcon from "../assets/closeIcon.png"

const WindowPopUp = (props) => {

  function close() {
    props.setActive(false)
  }

  return props.active ? (
    <div style={windowStyle} >
      <div style={contentStyle}>
        <img
          src={closeIcon}
          style={buttonStyle}
          onClick={() => props.setActive(false)}
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
  border: 'solid gray',
}

const contentStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 4,

  display: 'flex',
  flexDirection: 'column',

  alignItems: 'flex-end',

  opacity: '100%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 35
}

const buttonStyle = {
  textAlign: 'right',
  cursor: "pointer",
  marginBottom: 25,
  maxHeight: 20,
  maxWidth: 20
}


export default WindowPopUp