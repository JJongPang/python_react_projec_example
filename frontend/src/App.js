import React from 'react';
import {BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import User from './components/User';

const App = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <div>
          <Switch>
            <Route exact path='/' component={User} />
            <Route exact path='/about' component={About} />
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default App;