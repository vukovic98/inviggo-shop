
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/SignUp';
import Home from './components/shared/Home';
import Add from './components/adds/Add';
import ManageAdvertisement from './components/adds/ManageAdvertisement';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch className="ml-0 pl-0">
          <Route path="/" exact component={Home}></Route>
          <Route path="/log-in" exact component={Login}></Route>
          <Route path="/sign-up" exact component={Register}></Route>
          <Route path="/manage-advertisement/:id?" exact component={ManageAdvertisement}></Route>
          <Route path="/advertisement/:id" exact component={Add}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
