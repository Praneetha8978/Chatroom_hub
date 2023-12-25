import './styles/main.scss';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileContext } from './context/ProfileContext';
import LogIn from './pages/logins/LogIn/LogIn';
import SignUp from './pages/logins/SignUp/SignUp';
import Home from './pages/Home/index';


function App() {
  
  return (
    <div>
      <Router>
        <ProfileContext>
          <Routes>
            <Route path = "/signin" element = {<PublicRoute />}/>
            <Route path = "/" element = {<PrivateRoute />}/>
            <Route path = "/login" element = {<LogIn />}/>
            <Route path = "/signup" element = {<SignUp />}/>
            <Route path = "*" element={<Home />} />
          </Routes>
        </ProfileContext>
      </Router>
    </div>
  );
}

export default App;
