import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import FormErrors from "../FormErrors";

class Login extends Component {

    state = {
        playerName: "",
        password: "",
        error: "",
        playerNameError: "",
        passwordError: ""
    }

    inputChange = event => {
        this.setState({
            error: ""
        })
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })

        // reset errors for this field
        let stateName = name + "Error";
        this.setState({
            [stateName]: ""
        })
    }

    loginPlayer = event => {
        event.preventDefault();
        const playerName = this.state.playerName;
        const password = this.state.password;

        if (playerName === "") {
            this.setState({
                playerNameError: "Please enter your player name."
            })
        }

        if (password === "") {
            this.setState({
                passwordError: "Please enter your password."
            })
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
                        error: "Error: invalid email address or password."
                    })
                }
            });
        } else {
            // show error message - fill out all fields
            this.setState({
                error: "Error: please fill out both fields."
            })
        }

    }

    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Login</h1>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <form className="mt-3">
                            {this.state.error !== "" ?
                                <FormErrors className="form-error">{this.state.error}</FormErrors>
                                : ""}
                            <div className="form-group">
                                <label htmlFor="playerName" id="playerNameText">Player Name</label>
                                <input type="text"
                                className={this.state.playerNameError !== "" ? "form-control check" : "form-control"}
                                id="playerName" name="playerName"
                                    placeholder="Enter player name" onChange={this.inputChange} required />
                                {this.state.playerNameError !== "" ?
                                    <FormErrors className="invalid">{this.state.playerNameError}</FormErrors>
                                    : ""}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" id="passText">Password</label>
                                <input type="password"
                                className={this.state.passwordError !== "" ? "form-control check" : "form-control"}
                                id="pass" name="password" placeholder="Password" onChange={this.inputChange} required />
                                {this.state.passwordError !== "" ?
                                    <FormErrors className="invalid">{this.state.passwordError}</FormErrors>
                                    : ""}
                            </div>

                            <div className="text-center">
                                <button type="submit" id="login" className="btn btn-primary" onClick={this.loginPlayer}>Login</button>
                            </div>
                        </form>


                        <div className="row mt-4 justify-content-center">
                            <div className="co-md-12" id="loginText">
                                Don't have an account yet? <a href="/signup" className="alink">Sign Up</a> here.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
