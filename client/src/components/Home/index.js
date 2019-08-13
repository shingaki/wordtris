import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import FormErrors from "../FormErrors";
import logo from "./logo.png";
import banner from "./TaglineBanner.png";

class Home extends Component {
  state = {
    playerName: "",
    password: "",
    error: "",
    playerNameError: "",
    passwordError: ""
  };

  style1 = {
    position: "relative",
    // display: 'block',
    // margin: "0 auto",
    width: 40,
    height: 40,
    lineHeight: 2.5,
    borderRadius: 4,
    opacity: 1,
    color: "#fff",
    backgroundColor: "#560764"
  };

  style2 = {
    position: "relative",
    // display: 'block',
    // margin: "0 auto",
    width: 40,
    height: 40,
    lineHeight: 2.5,
    borderRadius: 4,
    opacity: 1,
    color: "#fff",
    backgroundColor: "#560764"
  };

  style3 = {
    position: "relative",
    // display: 'block',
    // margin: "0 auto",
    width: 40,
    height: 40,
    lineHeight: 2.5,
    borderRadius: 4,
    opacity: 1,
    color: "#fff",
    backgroundColor: "#560764"
  };

  styleA = {
    position: "absolute",
    // display: 'block',
    // margin: "0 auto",
    top: 55,
    left: 60,
    width: 40,
    height: 40,
    lineHeight: 2.5,
    borderRadius: 4,
    opacity: 1,
    color: "#fff",
    backgroundColor: "#560764"
  };

  styleT = {
    position: "absolute",
    // display: 'block',
    // margin: "0 auto",
    top: 55,
    left: 100,
    width: 40,
    height: 40,
    lineHeight: 2.5,
    borderRadius: 4,
    opacity: 1,
    color: "#fff",
    backgroundColor: "#560764"
  };

  inputChange = event => {
    this.setState({
      error: ""
    });
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    // reset errors for this field
    let stateName = name + "Error";
    this.setState({
      [stateName]: ""
    });
  };

  loginPlayer = event => {
    event.preventDefault();
    const playerName = this.state.playerName;
    const password = this.state.password;

    if (playerName === "") {
      this.setState({
        playerNameError: "Please enter your player name."
      });
    }

    if (password === "") {
      this.setState({
        passwordError: "Please enter your password."
      });
    }

    if (playerName && password) {
      API.loginPlayer(playerName, password).then(dbData => {
        // if login data is correct
        console.log(this.props);
        if (dbData.data !== false) {
          // update logged in state - redirect to play page?
          this.props.updateLoggedInState(true);
          console.log("loggedin");
          window.location.replace("/play");
        } else {
          // show error message - invalid login credentials
          this.setState({
            error: "Error: invalid username or password."
          });
        }
      });
    } else {
      // show error message - fill out all fields
      this.setState({
        error: "Error: please fill out both fields."
      });
    }
  };

  render() {
    return (
      <div className="container text-center">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-left">
            {/*  <img src={logo} style={{ maxWidth: 400, padding: 5, position: "relative" }}/> */}

            <div className="text-center mb-3" id="bannerDiv">
                <img id="banner" className="img-fluid" src={banner} alt="Wordtris" />
            </div>
            <p className="text-center mb-1">A mix between scrabble and tetris.</p>
            <div className="row">
                <div className="col-md-12 justify-content-center">
                    <div style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "max-content",
                        paddingRight: 80
                    }}>
                            <div style={{ maxWidth: 200, padding: 5, position: "relative" }}>
                                <div style={{ padding: "10px 15px" }}>
                                    <div style={this.style1} className="text-center">
                                        A
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "26px",
                                                right: "5px",
                                                fontSize: "10px",
                                                lineHeight: "1",
                                                zIndex: "6"
                                            }}>
                                            1
                                        </div>
                                    </div>

                                    <div style={this.style2} className="text-center">
                                        B
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "26px",
                                                right: "5px",
                                                fontSize: "10px",
                                                lineHeight: "1",
                                                zIndex: "6"
                                            }}>
                                            3
                                        </div>
                                    </div>

                                    <div style={this.styleA} className="text-center">
                                        A
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "26px",
                                                right: "5px",
                                                fontSize: "10px",
                                                lineHeight: "1",
                                                zIndex: "6"
                                            }}>
                                            1
                                        </div>
                                    </div>

                                    <div style={this.styleT} className="text-center">
                                        T
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "26px",
                                                right: "5px",
                                                fontSize: "10px",
                                                lineHeight: "1",
                                                zIndex: "6"
                                            }}>
                                            1
                                        </div>
                                    </div>

                                    <div style={this.style3} className="text-center">
                                        C
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "26px",
                                                right: "5px",
                                                fontSize: "10px",
                                                lineHeight: "1",
                                                zIndex: "6"
                                            }}>
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center mt-2">
                    <p>Login or sign up to play!</p>
                </div>
            </div>
        </div>





            {/* <div className="row align-items-center">
              <div className="col-md-6">
                <div
                  style={{ maxWidth: 200, padding: 5, position: "relative" }}
                >
                  <div style={{ padding: "10px 15px" }}>
                    <div style={this.style1} className="text-center">
                      A
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "5px",
                          fontSize: "10px",
                          lineHeight: "1",
                          zIndex: "6"
                        }}
                      >
                        1
                      </div>
                    </div>

                    <div style={this.style2} className="text-center">
                      B
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "5px",
                          fontSize: "10px",
                          lineHeight: "1",
                          zIndex: "6"
                        }}
                      >
                        3
                      </div>
                    </div>

                    <div style={this.styleA} className="text-center">
                      A
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "5px",
                          fontSize: "10px",
                          lineHeight: "1",
                          zIndex: "6"
                        }}
                      >
                        1
                      </div>
                    </div>

                    <div style={this.styleT} className="text-center">
                      T
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "5px",
                          fontSize: "10px",
                          lineHeight: "1",
                          zIndex: "6"
                        }}
                      >
                        1
                      </div>
                    </div>

                    <div style={this.style3} className="text-center">
                      C
                      <div
                        style={{
                          position: "absolute",
                          top: "26px",
                          right: "5px",
                          fontSize: "10px",
                          lineHeight: "1",
                          zIndex: "6"
                        }}
                      >
                        3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <p>Login or sign up to play!</p>
              </div>
            </div>
          </div> */}

          <div className="col-md-6 text-left">
            <h2 className="text-center mb-5">Welcome to Wordtris!</h2>
            <form className="">
              {this.state.error !== "" ? (
                <FormErrors className="form-error">
                  {this.state.error}
                </FormErrors>
              ) : (
                ""
              )}
              <div className="form-group">
                <label htmlFor="playerName" id="playerNameText">
                  Player Name
                </label>
                <input
                  type="text"
                  className={
                    this.state.playerNameError !== ""
                      ? "form-control check"
                      : "form-control"
                  }
                  id="playerName"
                  name="playerName"
                  placeholder="Enter player name"
                  onChange={this.inputChange}
                  required
                />
                {this.state.playerNameError !== "" ? (
                  <FormErrors className="invalid">
                    {this.state.playerNameError}
                  </FormErrors>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="pass" id="passText">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    this.state.passwordError !== ""
                      ? "form-control check"
                      : "form-control"
                  }
                  id="pass"
                  name="password"
                  placeholder="Password"
                  onChange={this.inputChange}
                  required
                />
                {this.state.passwordError !== "" ? (
                  <FormErrors className="invalid">
                    {this.state.passwordError}
                  </FormErrors>
                ) : (
                  ""
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  id="login"
                  className="btn btn-primary"
                  onClick={this.loginPlayer}
                >
                  Login
                </button>
              </div>
            </form>

            <div className="row mt-4 justify-content-center">
              <div className="co-md-12" id="loginText">
                Don't have an account yet?{" "}
                <a href="/signup" className="alink">
                  Sign Up
                </a>{" "}
                here.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
