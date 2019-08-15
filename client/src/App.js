import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Play from "./components/Play";
import NoMatch from "./components/NoMatch";
import LoginPrompt from "./components/LoginPrompt";
import Stats from "./components/Stats";

class App extends Component {

  state = {
    loggedin: false,
    userID: NaN
  }

  componentWillMount = () => {
    this.checkLoggedInState();
  }

  checkLoggedInState = () => {
    axios.get("/isloggedin", { withCredentials: true }).then(UserInfo => {
      console.log("are they logged in");
      console.log(UserInfo.data);
      this.updateLoggedInState(UserInfo.data.loggedin, UserInfo.data.userId);
    }).catch(err => console.log(err))
  }

  updateLoggedInState = (value, ID) => {
    this.setState({
      loggedin: value,
      userID: ID
    })
  }



  LoginSection = (props) => {
    return (
      <Login updateLoggedInState={this.updateLoggedInState} autoLogin={this.autoLogin} />
    );
  }

  HomePage = (props) => {
    return (
      <Home updateLoggedInState={this.updateLoggedInState} autoLogin={this.autoLogin} />
    );
  }

  SignUpSection = (props) => {
    return (
      <SignUp updateLoggedInState={this.updateLoggedInState} />
    );
  }

  StatsSection = (props) => {
    return (
      <Stats loggedin={this.state.loggedin} />
    );
  }

  PlayPage = (props) => {
    return (
      <Play userID={this.state.userID} />
    )
  }

  render() {
    return (
      <>
        <Navbar loggedin={this.state.loggedin} updateLoggedInState={this.updateLoggedInState} />
        <Router>
          <Switch>
            {!this.state.loggedin ?
              <Route exact path="/" render={this.HomePage} /> : <Route exact path="/" render={this.StatsSection} />
            }
            <Route exact path="/login" render={this.LoginSection} />
            <Route exact path="/signup" render={this.SignUpSection} />
            {this.state.loggedin ?
              <Route exact path="/play" render={this.PlayPage} /> : <Route exact path="/play" component={LoginPrompt} />
            }
            <Route exact path="/scores" render={this.StatsSection} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
