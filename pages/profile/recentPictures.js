import { useEffect, useState } from "react"
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage"
import { doc, getDoc, getFirestore } from "firebase/firestore";
import loadingIcon from "../../assets/loadingIcon.png"
import "./recentPictures.css"

export const RecentPictures = (props) => {
  const [stage, setStage] = useState("Loading")
  const [imagesList, setImagesList] = useState([])

  const recentPicsStages = {Loading: <Loading />, NoPics: <NoPics />, Error: <Error />}
  const folderRef = storageRef(getStorage(), `users/${props.email}/profile_pictures`)

  useEffect(() => {
    getPics()
  }, [])

  async function getPics() {
    //checks what is the user's current image
    const docRef = doc(getFirestore(), "account-data", props.email)
    const docSnap = await getDoc(docRef)
    
    let lastPic //0 for no image or if last image was uploaded

    if (docSnap.exists()) {
      lastPic = docSnap.data().lastPicture
      console.log(lastPic)
    }

    listAll(folderRef)
      .then((res) => {
        let items = res.items

        if (items.length <= 1) {
          setStage("NoPics")
          return
        }

        if (lastPic != 0) {
          //If the user's current picture was taken from "Recent Pictures", 
          //it will be removed from the array so as not to be displayed again
          const imgIndex = items.findIndex(imgRef => 
            imgRef.name === lastPic.toString()
          )

          items.splice(imgIndex, 1)
        } else {
          //if the user's image was the last one uploaded
          items = items.slice(0, -1)
        }

        if (items.length > 3) {
          items = items.slice(-3)
        }

        //get their download links to render in the component
        items.forEach((item) => {
          getDownloadURL(item)
            .then(url => {
              setImagesList(imagesList => [...imagesList, {number: item.name, url: url}])
            })

      })}).catch((error) => {
        props.setMessage(error.message)
        setStage(() => "Error")
      })
  }

  return imagesList.length > 0 ? 
    (<div className="recent-pics">
      <h3 className="title">Recent pictures</h3>

      <div className="images-container">
        {imagesList.map((image, index) => (
          <ImageExample 
            imageURL={image.url} 
            number={image.number} 
            changePicture={props.changePicture} 
            changePicNumber={props.changePicNumber} 
            key={index} 
          />)
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
  function changePicture() {
    props.changePicture(props.imageURL)
    props.changePicNumber(parseInt(props.number))
  }

  return (
    <div className="image-example" onClick={() => changePicture()}>
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
    src={loadingIcon}
    alt="Loading" 
  />
)
const Error = () => (<h3>Error finding images</h3>)
const NoPics = () => (<h3>No pictures</h3>)
