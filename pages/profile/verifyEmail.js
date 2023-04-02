
const VerifyEmail = props => {
  return props.verified ? 
  (<p style={{fontWeight: "bold", color: "green"}}>Email validado</p>) : 
  (<button type="button" onClick={() => props.verifyFunc()}>Verificar email</button>)
}

export default VerifyEmail