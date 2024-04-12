import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MisTurnos from './src/views/MisTurnos';
import Home from './src/views/Home';
import NavBar from './src/components/NavBar';

const Routes = () => {
  return (
    <Router>
        <Home/>
      {/* <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/misTurn" component={MisTurnos} />
      </Switch> */}
    </Router>
  );
}

export default Routes;