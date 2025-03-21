import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  componentDidMount = () => {
    this.checkLoggedInState();
  }

  checkLoggedInState = () => {
    axios.get("/isloggedin").then(UserInfo => {
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
        <BrowserRouter>
          <Routes>
            {!this.state.loggedin ?
              <Route exact path="/" element={<this.HomePage/>} /> : <Route exact path="/" element={<this.StatsSection/>} />
            }
            <Route exact path="/login" element={<this.LoginSection/>} />
            <Route exact path="/signup" element={<this.SignUpSection/>} />
            {this.state.loggedin ?
                <Route exact path="/play" element={<this.PlayPage/>} /> : <Route exact path="/play" element={<LoginPrompt/>} />
            }
            <Route exact path="/scores" element={<this.StatsSection/>} />
            <Route element={<NoMatch/>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
