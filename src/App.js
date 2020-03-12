import React from 'react';
import Header from "./component/Header";
import Container from "./component/Container";
import {ToastContainer} from 'react-toastify';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from "./component/About";
import DashBord from './component/DashBord';
import PageNotFound from "./component/PageNotFound";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Header/>
      <Switch>
        <Route exact path="/" component={Container}/>
        <Route path="/about" component={About}/>
        <Route path="/dashborad" component={DashBord}/>
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
