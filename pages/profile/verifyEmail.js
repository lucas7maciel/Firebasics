import { getAuth, sendEmailVerification } from "firebase/auth"

const VerifyEmail = (props) => {
  function verifyEmail() {
    sendEmailVerification(getAuth().currentUser)
      .then(() => props.changeMessage("Verificação enviada com sucesso"))
      .catch(error => {
        console.log("Erro ao enviar verificação")
        console.log(error)

        props.changeMessage("Erro ao enviar verificação")
      })
  }

  return props.verified ? 
  (<p style={{fontWeight: "bold", color: "green"}}>Email validado</p>) : 
  (<button type="button" onClick={() => verifyEmail()}>Verificar email</button>)
}

export default VerifyEmail