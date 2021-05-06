
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './components/shared/NavigationBar';
import Switch from 'react-bootstrap/esm/Switch';
import React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/SignUp';
import Home from './components/shared/Home';
import AddAdvertisement from './components/adds/AddAdvertisement';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch className="ml-0 pl-0">
          <Route path="/" exact component={Home}></Route>
          <Route path="/log-in" exact component={Login}></Route>
          <Route path="/sign-up" exact component={Register}></Route>
          <Route path="/add-advertisement" exact component={AddAdvertisement}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
