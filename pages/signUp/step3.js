import { Component } from "react"
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth"
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage} from "firebase/storage"
import {doc, getFirestore, setDoc} from "firebase/firestore"

export class Step3 extends Component {
  constructor(props) {
    super(props)

    this.user = props.user
    this.state = {
      message: ""
    }
  }

  componentDidMount() {
    this.createUser()
  }

  createUser() {
    this.setState({message: "Creating user..."})
    console.log(this.user)
    createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
      .then(async () => {
        if (this.user.displayName || this.user.picture) {
          await this.updateData()
        }

        if (this.user.aboutMe) {
          await this.uploadDescription()
        }

        await this.uploadAccountInfo()

        this.setState({message: "Account ready to use"})
        this.props.setMessage("Go back to the login page to sign in")
      })
      .catch(error => {
        this.setState({message: "Error creating user..."})
        this.props.setMessage(error.message)
      });
  }

  async updateData() {
    let downloadUrl 

    this.setState({message: "Updating data..."})

    if (this.user.picture) {
      downloadUrl = await this.getProfilePic()
    }

    const newData = {
      displayName: this.user.displayName || "",
      photoURL: downloadUrl || ""
    }

    updateProfile(getAuth().currentUser, newData)
      .catch(error => {
        this.setState({message: "Failed to update data"})
        this.props.setMessage(error.message)
      })
  }

  async getProfilePic() {
    const imageRef = storageRef(getStorage(), `users/${this.user.email}/profile_pictures/1`)
    let imageUrl

    await uploadBytes(imageRef, this.user.picture)
      .then(async () => {

        await getDownloadURL(imageRef)
          .then(url => imageUrl = url)
          .catch(error => {
            this.setState({message: "Error updating image..."})
            this.props.setMessage(error.message)
          })
      })
      .catch((error) => {
        this.setState({message: "Error uploading image"})
        this.props.setMessage(error.message)
      })

    return imageUrl
  }

  async uploadDescription() {
    const docRef = doc(getFirestore(), `about-me/${this.user.email}`)
    const docData = {aboutMe: this.user.aboutMe}

    await setDoc(docRef, docData)
      .then(() => {
        this.setState({message: "'About Me' uploaded"})
      })
      .catch(error => {
        this.setState({message: "Error uploading 'About Me'"})
        this.props.setMessage(error.message)
      })
  }

  async uploadAccountInfo() {
    const docRef = doc(getFirestore(), `account-data/${this.user.email}`)
    const docData = {
      loggedTimes: 0,
      lastLogin: "",
      accountCreatedIn: new Date().toJSON().slice(0, 10)
    }

    await setDoc(docRef, docData)
      .then(() => {
        this.setState({message: "Account info uploaded"})
      })
      .catch(error => {
        this.setState({message: "Error uploading account info"})
        this.props.setMessage(error.message)
      })
  }

  render() {
    return (
      <div className="step">
        <h2>{this.state.message}</h2>
      </div>
    )
  }
}
