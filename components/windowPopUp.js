import { useEffect } from "react"

const WindowPopUp = (props) => {
  useEffect(() => console.log(props.active + " Mudou"), [props.active])

  function close() {
    props.setOpen(false)
  }

  return (
    <div style={props.active ? {display: "fixed", left:0, width: '90%', backgroundColor: 'red'} : {display:"none"}}>
      <button type="button" onClick={() => close()}>Fechar</button>
      {props.content}
    </div>
  )
}

export default WindowPopUp