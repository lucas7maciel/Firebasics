import { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./functions/firebase"

import {SignIn} from './pages/signIn/page'
import {SignUp} from './pages/signUp/page'
import {Profile} from './pages/profile/page'
import {RecoverPasw} from './pages/recoverPasw/page'

import "./app.css"

export default function App() {
  useEffect(() => {
    document.title = "Firebasics"
  }, [])

  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recoverPasw" element={<RecoverPasw />} />
        </Routes>
    </Router>
  );
}