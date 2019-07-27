import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Play from "./components/Play"

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Router>
          <Switch>
            {/* <Route exact path="/" render={this.ResultsSection} /> */}
            {/* <Route exact path="/login" render={this.SavedSection} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/play" component={Play} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
