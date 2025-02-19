import React from 'react';
import { Route, Switch } from 'wouter';

import Sandbox from './pages/Sandbox';
import ColorTester from './pages/ColorTester';
import EmptyPage from './pages/EmptyPage';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <>
      <Route path="/sandbox">Sandbox</Route>
      <Switch>
        <Route path="/q5xts" component={Home}></Route>
        <Route path="/q5xts/sandbox" component={Sandbox}></Route>
        <Route path="/q5xts/colortester" component={ColorTester}></Route>
        <Route component={EmptyPage}></Route>
      </Switch>
    </>
  );
}

export default App;
