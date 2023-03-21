import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import SignIn from './pages/signIn/page'
import SignUp from './pages/signUp/page'

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
      </Router>
  );
}
