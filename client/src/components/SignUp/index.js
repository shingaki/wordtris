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
        error: ""
    }

    inputChange = event => {
        this.setState({
            error: ""
        })
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    submitForm = event => {
        event.preventDefault();
        const playerName = this.state.playerName;
        const email = this.state.email;
        const password1 = this.state.password1;
        const password2 = this.state.password2;

        if (password1 === password2) {
            API.checkPlayerName(playerName).then(dbData => {
                // if playerName isn't taken
                if (dbData === true) {
                    API.createPlayer(playerName, email, password1);
                } else {
                    // show error message - playerName already taken
                    this.setState({
                        error: "Error: that player name is already taken. Please try a different one."
                    })
                }
            });
        } else {
            // error passwords don't match
            this.setState({
                error: "Error: passwords don't match.  Please enter the same password twice."
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
                            { this.state.error !== "" ?
                                <FormErrors>{this.state.error}</FormErrors>
                                : "" }
                            <div className="form-group">
                                <label htmlFor="playerName" id="playerNameText">Player Name</label>
                                <input type="text" className="form-control" id="playerName" name="playerName"
                                    placeholder="Enter a player name" value={this.playerName} onChange={this.inputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" id="emailText">Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                    placeholder="Enter Email" value={this.email} onChange={this.inputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" id="passText">Password</label>
                                <input type="password" className="form-control" id="pass" name="password1" placeholder="Password" value={this.password1} onChange={this.inputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass2" id="passText">Re-enter Password</label>
                                <input type="password" className="form-control" id="pass2" name="password2" placeholder="Re-enter Password" value={this.password2} onChange={this.inputChange} />
                            </div>

                            <div className="text-center">
                                <button type="submit" id="login" className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                            </div>
                        </form>


                        <div className="row mt-4 justify-content-center">
                            <div className="co-md-12" id="loginText">
                                Already have an account? <a href="/login">Login</a> here.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default SignUp;
