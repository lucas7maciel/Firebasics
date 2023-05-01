import closeIcon from "../assets/closeIcon.png"
import "./windowPopUp.css"

export const WindowPopUp = (props) => {
  function close() {
    props.setActive(() => false)
  }

  return props.active ? (
    <>
    <div className="background-shadow"
      onClick={() => close()}
    />
  
    <div className="window">
      <img className="close-icon"
        src={closeIcon}
        onClick={() => close()}
      />

      {props.content}
    </div>
    </>
  ) : null
}