import { getAuth, sendEmailVerification } from "firebase/auth"

const VerifyEmail = (props) => {
  function verifyEmail() {
    sendEmailVerification(getAuth().currentUser)
      .then(() => {
        props.setMessage("Verification sent to your email, confirm and refresh to get verified symbol")
      })
      .catch(error => {
        props.setMessage("Error sending verification\n:" + error.message)
      })
  }

  return props.verified ? 
  (<p className="email-validated">Email validated</p>) : 
  (<button 
    type="button" 
    onClick={() => verifyEmail()}
    >Verify email
  </button>
  )
}

export default VerifyEmail