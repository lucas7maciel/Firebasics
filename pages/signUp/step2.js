import { useState, forwardRef, useImperativeHandle } from "react"

const Step2 = forwardRef((props, ref) => {
  const [linkedIn, setLinkedIn] = useState("a")
  const [gitHub, setGitHub] = useState("a")
  const [instagram, setInstagram] = useState("a")
  const [aboutMe, setAboutMe] = useState("a")

  useImperativeHandle(ref, () => ({
    verify: verify,
    getData: getData
  }));

  function verify() {
    if (linkedIn === "") {
      console.log("LinkedIn vazio")
      return false
    }

    if (gitHub === "") {
      console.log("GitHub vazio")
      return false
    }

    return true
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
        <input type="text" placeholder="LinkedIn" value={linkedIn} onChange={evt => setLinkedIn(evt.target.value)} />
        <input type="text" placeholder="GitHub" value={gitHub} onChange={evt => setGitHub(evt.target.value)} />
        <input type="text" placeholder="Instagram" value={instagram} onChange={evt => setInstagram(evt.target.value)} />
        <textarea row="5" columns="20" value={aboutMe} onChange={evt => setAboutMe(evt.target.value)} />
      </form>
    </div>
  )
})

export default Step2