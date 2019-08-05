import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import logo from "./Banner.png";

class Navbar extends Component {
  logout = event => {
    event.preventDefault();
    axios.get("/logout").then(data => {
      console.log(data);
      this.props.updateLoggedInState(false);
      window.location.replace("/");
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img src={logo} style={{ maxWidth: 150, padding: 0, margin: 0, position: "relative" }} alt="Wordtris" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {this.props.loggedin ? (
              ""
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className={
                      window.location.pathname === "/login"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      window.location.pathname === "/signup"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    href="/signup"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            )}
            <li className="nav-item">
              <a
                className={
                  window.location.pathname === "/scores"
                    ? "nav-link active"
                    : "nav-link"
                }
                href="/scores"
              >
                High Scores
              </a>
            </li>
            {this.props.loggedin ? (
              <li className="nav-item">
                <a
                  className={
                    window.location.pathname === "/play"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/play"
                >
                  Play
                </a>
              </li>
            ) : (
              ""
            )}
            {this.props.loggedin ? (
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={this.logout}>
                  Logout
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
