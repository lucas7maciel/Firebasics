import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import "./functions/firebase"

import {SignIn} from './pages/signIn/page'
import {SignUp} from './pages/signUp/page'
import {Profile} from './pages/profile/page'
import {RecoverPasw} from './pages/recoverPasw/page'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/recoverPasw" element={<RecoverPasw />}></Route>
        </Routes>
    </Router>
  );
}