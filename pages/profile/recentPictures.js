import { useEffect, useState } from "react"
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage"
import "./recentPictures.css"

export const RecentPictures = (props) => {
  const [stage, setStage] = useState("Loading")
  const [urlList, setUrlList] = useState([])

  const recentPicsStages = {Loading: <Loading />, NoPics: <NoPics />, Error: <Error />}
  const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)

  useEffect(() => getPics(), [])

  function getPics() {
    listAll(folderRef)
      .then((res) => {
        //get the last photos of the user (max 3)
        let items = res.items.slice(0, -1)

        if (items.length <= 1) {
          setStage(() => "NoPics")
        } else if (items.length > 3) {
          items = items.slice(-3)
        }

        //get their download links to render in the component
        items.forEach((item) => {
          getDownloadURL(item)
            .then(url => setUrlList(urlList => [...urlList, url]))

      })}).catch(error => {
        setStage(() => "Error")
      })
  }

  return urlList.length > 0 ? 
    (<div className="recent-pics">
      <h3 className="title">Recent pictures</h3>

      <div className="images-container">
        {urlList.map((url, index) => {
          return <ImageExample imageURL={url} changeState={props.changeState} key={index} />}
        )}
      </div>
    </div>
    ) : 
    (<div className="recent-pics">
      {recentPicsStages[stage]}
    </div>
    )
}

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

const Loading = () => (
  <img 
    className="loading-icon"
    src="https://www.freeiconspng.com/uploads/load-icon-png-8.png"
    alt="Loading" 
  />
)
const Error = () => (<h3>Erro ao encontrar imagens</h3>)
const NoPics = () => (<h3>No pictures</h3>)
