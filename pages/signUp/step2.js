import { useState, forwardRef, useImperativeHandle } from "react"

const Step2 = forwardRef((props, ref) => {
  const [linkedIn, setLinkedIn] = useState("")
  const [gitHub, setGitHub] = useState("")
  const [instagram, setInstagram] = useState("")
  const [aboutMe, setAboutMe] = useState("")

  useImperativeHandle(ref, () => ({
    getData: getData
  }));

  function verify() {
    if (linkedIn === "") {
      return console.log("LinkedIn vazio")
    }

    if (gitHub) {
      return console.log("GitHub vazio")
    }
  }

  function getData() {
    return {
      linkedIn: linkedIn,
      gitHub: gitHub,
      instagram: instagram,
      aboutMe: aboutMe
    }
  }

  return (
    <div>
      <h1>Informações adicionais</h1>

      <form>
        <input type="text" placeholder="LinkedIn" />
        <input type="text" placeholder="GitHub" />
        <input type="text" placeholder="Instagram" />
        <textarea row="5" columns="20" />
      </form>
    </div>
  )
})

export default Step2