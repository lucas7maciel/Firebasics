import "./account.css"

export const Account = (props) => {
  return (
    <div className="account">
      <div className="picture-container">
        <img
          className="profile-picture" 
          src={props.picture} 
          alt="Profile Picture"
        />
      </div>
      

      <div className="text">
        <h4 className="name">{props.displayName || "(No Name)"}</h4>
        <span className="description">{props.description || "(No desrcription)"}</span>
      </div>
    </div>
  )
}