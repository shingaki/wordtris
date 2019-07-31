import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import FormErrors from "../FormErrors";

class SignUp extends Component {

    state = {
        playerName: "",
        email: "",
        password1: "",
        password2: "",
        formError: "",
        playerNameError: "",
        emailError: "",
        password1Error: "",
        password2Error: ""
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

    submitForm = event => {
        event.preventDefault();
        console.log("submit")
        const playerName = this.state.playerName;
        const email = this.state.email;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        
        if (playerName === "") {
            this.setState({
                playerNameError: "Please enter a player name."
            })
        }
        
        if (email === "") {
            console.log("email error")
            this.setState({
                emailError: "Please enter a valid email address."
            })
        }
        
        if (password1 === "") {
            this.setState({
                password1Error: "Please enter a password."
            })
        }
        
        if (password2 === "") {
            this.setState({
                password2Error: "Please enter your password again."
            })
        }

        if (playerName && email && password1 && password2) {
            if (password1 === password2) {
                API.checkPlayerName(playerName).then(dbData => {
                    // if playerName isn't taken
                    console.log(dbData.data.playerName);
                    if (dbData.data.playerName === "available") {
                        API.createPlayer(playerName, email, password1).then(feedback => {
                            console.log(feedback.data);
                            this.props.updateLoggedInState(true);
                            window.location.replace("/play");
                        });
                    } else {
                        // show error message - playerName already taken
                        this.setState({
                            formError: "Error: that player name is already taken. Please try a different one."
                        })
                    }
                });
            } else {
                // error passwords don't match
                this.setState({
                    formError: "Error: passwords don't match.  Please enter the same password twice."
                })
            }
        } else {
            // show error message - fill out all fields
            this.setState({
                formError: "Error: please fill out all fields."
            })
        }
        
    }

    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Sign Up</h1>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <form className="mt-3">
                            { this.state.formError !== "" ?
                                <FormErrors className="form-error">{this.state.formError}</FormErrors>
                                : "" }

                            <div className="form-group">
                                <label htmlFor="playerName" id="playerNameText">Player Name</label>
                                <input type="text"
                                    className={this.state.playerNameError !== "" ? "form-control check" : "form-control"}
                                id="playerName" name="playerName"
                                    placeholder="Enter a player name" value={this.playerName} onChange={this.inputChange} required />
                                {this.state.playerNameError !== "" ?
                                    <FormErrors className="invalid">{this.state.playerNameError}</FormErrors>
                                    : ""}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" id="emailText">Email</label>
                                <input type="email"
                                className={this.state.emailError !== "" ? "form-control check" : "form-control"}
                                id="email" name="email"
                                    placeholder="Enter Email" value={this.email} onChange={this.inputChange} required />
                                    {this.state.emailError !== "" ?
                                    <FormErrors className="invalid">{this.state.emailError}</FormErrors>
                                        : ""}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" id="passText">Password</label>
                                <input type="password"
                                className={this.state.password1Error !== "" ? "form-control check" : "form-control"}
                                id="pass" name="password1" placeholder="Password" value={this.password1} onChange={this.inputChange} required />
                                {this.state.password1Error !== "" ?
                                    <FormErrors className="invalid">{this.state.password1Error}</FormErrors>
                                    : ""}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass2" id="passText">Re-enter Password</label>
                                <input type="password"
                                className={this.state.password2Error !== "" ? "form-control check" : "form-control"}
                                id="pass2" name="password2" placeholder="Re-enter Password" value={this.password2} onChange={this.inputChange} required />
                                {this.state.password2Error !== "" ?
                                    <FormErrors className="invalid">{this.state.password2Error}</FormErrors>
                                    : ""}
                            </div>

                            <div className="text-center">
                                <button type="submit" id="signup" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                            </div>
                        </form>


                        <div className="row mt-4 justify-content-center">
                            <div className="co-md-12" id="loginText">
                                Already have an account? <a href="/login" className="alink">Login</a> here.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default SignUp;
