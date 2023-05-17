
export const AccountInfo = (props) => {
  return (
    <div className="account-info center">
      <h3>Account Info</h3>

      <div>
        <p style={{fontWeight: "bold"}}>Logged Times</p>
        <span>{props.info.loggedTimes}</span>
      </div>

      <hr />

      <div>
        <p style={{fontWeight: "bold"}}>Last Login</p>
        <span>{props.info.lastLogin}</span>
      </div>

      <hr />

      <div>
        <p style={{fontWeight: "bold"}}>Created At</p>
        <span>{props.info.createdAt || "No info"}</span>
      </div>
    </div>
  )
}