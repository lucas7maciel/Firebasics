import { useState, useEffect } from "react"

const Step3 = (props) => {
  const [current, setCurrent] = useState(props.current)

  useEffect(() => {
    setCurrent(props.current)
  }, [props.current])

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <h1>Criando usuário</h1>
      <h2>{current}</h2>
    </div>
  )
}

export default Step3