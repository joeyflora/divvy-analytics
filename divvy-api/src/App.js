
import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles.scss'
import Nav from './components/Nav'
import Map from './components/Map'
import Trips from './components/Trips'
import Home from './components/Home'
import Stations from './components/Stations'
import MapContainer from './components/MapContainer';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/stations" component={Stations} />
          <Route path="/map" component={MapContainer} />
          <Route path="/Trips" component={Trips} />
          <Route path="/map" component={Map} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
