import React from 'react';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import Sandbox from './pages/Sandbox';
import ColorTester from './pages/ColorTester';
import EmptyPage from './pages/EmptyPage';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router base="/q5xts" hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/sandbox" component={Sandbox}></Route>
        <Route path="/colortester" component={ColorTester}></Route>
        <Route path="*" component={EmptyPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
