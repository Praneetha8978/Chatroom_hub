import './App.css';
import './styles/main.scss';
import 'rsuite/dist/rsuite.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileContext } from './context/ProfileContext';
function App() {
  
  return (
    <div>
      <Router>
        <ProfileContext>
          <Routes>
            <Route path = "/signin" element = {<PublicRoute />}/>
            <Route path = "/" element = {<PrivateRoute />}/>
          </Routes>
        </ProfileContext>
      </Router>
    </div>
  );
}

export default App;
