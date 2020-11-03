
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles.scss'
import Nav from './components/Nav'
import Map from './components/Map'
import Revenue from './components/Revenue'
import Home from './components/Home'
import Stations from './components/Stations'

const App = () => {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/stations" component={Stations} />
          <Route path="/revenue" component={Revenue} />
          <Route path="/map" component={Map} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
