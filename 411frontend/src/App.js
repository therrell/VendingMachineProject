import React from 'react';
import './App.css';
import Login from './components/Login';

import Signup from './components/Signup';
import Mainfunction from './components/Mainfunction';
import Userinfo from './components/Userinfo';
import VMinfo from './components/VMinfo';
import Location from './components/Location';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';




class App extends React.Component {
  render() {
    return (
        <div className="App" style={{fontFamily: 'Lato'}}>

          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/mainfunction" component={Mainfunction} />
              <Route path="/userinfo" component={Userinfo} />
              <Route path="/vminfo" component={VMinfo} />
              <Route path="/location" component={Location} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
