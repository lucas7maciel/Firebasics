import closeIcon from "../assets/closeIcon.png"
import "./windowPopUp.css"

export const WindowPopUp = (props) => props.active ? (
  <div className="background">
    <div className="window">
      <img className="close-icon"
        src={closeIcon}
        onClick={() => props.setActive(() => false)}
      />

      {props.content}
  </div>
  </div>
) : null
