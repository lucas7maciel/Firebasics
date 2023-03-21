import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import SignIn from './pages/signIn/page'
import SignUp from './pages/signUp/page'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn /*navigate={navigate}*/ />}></Route>
          <Route path="/signUp" element={<SignUp /*navigate={navigate}*/ />}></Route>
        </Routes>
    </Router>
  );
}