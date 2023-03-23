import { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("Entrou")
  }

  render() {
    return (
      <div>
        <Link to={"/"}>Sair</Link>
      </div>
    )
  }
}

export default Home