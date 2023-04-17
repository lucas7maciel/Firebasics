import { useEffect, useState } from "react"
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage"

import "../../functions/styles.css"
import "./recentPictures.css"

export const RecentPictures = (props) => {
  const [urlList, setUrlList] = useState([])
  const [stage, setStage] = useState("Loading")

  const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)
  const recentPicsStages = {
    Loading: <Loading />,
    NoPics: <NoPics />,
    Error: <Error />
  }

  useEffect(() => {
    listAll(folderRef)
      .then((res) => {
        let items = res.items.slice(0, -1)

        if (items.length <= 1) {
          setStage(() => "NoPics")
        } else if (items.length > 3) {
          items = items.slice(-3)
        }

        items.forEach((item) => {
          getDownloadURL(item)
            .then(url => {
              setUrlList(urlList => [...urlList, url]) 
            })
      })}).catch(error => {
        setStage(() => "Error")
      })
  }, [])

  useEffect(() => console.log(recentPicsStages[stage]), [stage])

  return urlList.length > 0 ? (
    <div className="container recent-pics">
      <hr />
      <h3>Recent pictures</h3>
      <div className="images-container">
        {urlList.map((url, index) => {
          return <ImageExample imageURL={url} changeState={props.changeState} key={index} />}
        )}
      </div>
      <hr />
    </div>
  ) : recentPicsStages[stage]
}

const Loading = () => (
  <div className="container loading">
    <hr />
    <img id="loading-icon" src="https://www.freeiconspng.com/uploads/load-icon-png-8.png" alt="Loading" />
    <hr />
  </div>
)

const Error = () => (
  <div className="container">
    <h3>Erro ao encontrar imagens</h3>
  </div>
)

const NoPics = () => (
  <div className="container">
    <h3>No pictures</h3>
  </div>
)


const ImageExample = (props) => {
  return (
    <div className="image-example" onClick={() => props.changeState(props.imageURL)}>
      <img 
        src={props.imageURL} 
        alt="Example image" 
      />
    </div>
  )
}