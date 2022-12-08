import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Login from './pages/Login';
import Register from './pages/Register';
import Messages from './pages/Messages';

function App() {
  localStorage.removeItem('user_info');
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/home' exact component={Home} />
          <Route path='/messages' exact component={Messages} />
          <Route path='/logout' exact component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
