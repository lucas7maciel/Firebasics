import { useState, forwardRef, useImperativeHandle } from "react"
import { ImagePicker } from "../../components/imagePicker"

const Step2 = forwardRef((props, ref) => {
  const [picture, setPicture] = useState("")
  const [aboutMe, setAboutMe] = useState("a")

  useImperativeHandle(ref, () => ({
    verify: verify,
    getData: getData
  }));

  function verify() {
    //formatos inválidos
    if (picture && !picture.type.includes("image")) {
      console.log(picture)
      console.log("O formato do arquivo deve ser uma imagem")
      return false
    } 

    return true
  }

  function getData() {
    return {
      picture: picture,
      aboutMe: aboutMe
    }
  }

  return (
    <>
    <h1 className="step-title">Informações adicionais</h1>
    <div className="step">
      <div>
        <ImagePicker picture={picture} changePicture={setPicture} />

        <label htmlFor="aboutMe">About me</label><br/>
        <textarea id="aboutMe" row="5" columns="20" value={aboutMe} onChange={evt => setAboutMe(evt.target.value)} />
      </div>
    </div>
    </>
  )
})

export default Step2