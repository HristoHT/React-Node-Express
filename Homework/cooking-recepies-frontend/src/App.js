import React from 'react';
import 'typeface-roboto';
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import Home from './Components/Home'
import Login from './Components/Login'
import Register from './Components/Register'

import './css/materialize.css';
function App() {
  return (
    <Router history={history}>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
