import { useNavigate } from "react-router-dom";

function changePage(route, state={}) {
  const navigate = useNavigate()
  navigate(route, {state: state})
}

export {changePage}