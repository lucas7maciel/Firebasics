import { useEffect, useState } from "react"
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { collection, getFirestore, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Account } from "./account"
import "./page.css"

export const Accounts = () => {
  const [search, setSearch] = useState("")
  const [accounts, setAccounts] = useState([])

  useEffect(() => loadUsers(), [])

  async function filterDescriptions() {
    const ref = collection(getFirestore(), "about-me")

    const docs = query(ref, where("user", "array-contains", search))
    const descriptions = await getDocs(docs);

    setAccounts([])

    descriptions.forEach(async (doc) => {
      const email = doc.data().user[0]   
      const picture = await getUserPicture(email)

      setAccounts((accounts) => [
        ...accounts, {
          picture: picture,
          displayName: doc.data().user[1] || "",
          description: doc.data().aboutMe || ""
        }
      ])
    })
  }

  async function getUserPicture(email) {
    const docRef = doc(getFirestore(), "account-data", email)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return ""
    }

    const picture = docSnap.data().lastPicture
    const folderRef = ref(getStorage(), `users/${email}/profile_pictures`)
    
    const pictures = await listAll(folderRef)
    const picRef = pictures.items[picture == 0 ? pictures.items.length - 1 : picture - 1]
    
    if (!picRef) {
      return ""
    }

    const url = await getDownloadURL(picRef)
    return url
  }

  function loadUsers() {
    getDocs(collection(getFirestore(), "about-me"))
      .then((snapshot) => {
        snapshot.forEach(async (doc) => {
          console.log(doc.data())
          const email = doc.data().user[0]   
          const picture = await getUserPicture(email)

          setAccounts((accounts) => [
            ...accounts, {
            picture: picture,
            displayName: doc.data().user[1] || "",
            description: doc.data().aboutMe || ""
            }
          ])
        })
      })
  }

  return (
    <div className="page">
    <div className="content accounts-page">
      <h1 className="title">Accounts:</h1>

      <div className="search">
        <input
          value={search}
          onChange={evt => setSearch(evt.target.value)}
          placeholder="Search for user or email" 
        />

        <button onClick={() => filterDescriptions()}>Search</button>
      </div>

      <hr />

      <div className="accounts">
        {accounts.length > 0 ? accounts.map((account, index) =>
          <Account
            className = "account" 
            picture = {account.picture} 
            displayName = {account.displayName} 
            description = {account.description} 
            key = {index}
          />
        ) : <h2 className="no-users">No users searched</h2>}
      </div>
      
    </div>
    </div>
  )
}
