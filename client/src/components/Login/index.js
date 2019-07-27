import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import FormErrors from "../FormErrors";

class Login extends Component {

    state = {
        username: "",
        password: "",
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

    loginUser = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        API.loginUser(username, password).then(dbData => {
            // if login data is correct
            if (dbData === true) {
                // log them in - redirect to play page?
            } else {
                // show error message - invalid login credentials
                this.setState({
                    error: "Error: invalid email address or password."
                })
            }
        });

    }

    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Login</h1>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <form className="mt-3">
                            {this.state.error !== "" ?
                                <FormErrors>{this.state.error}</FormErrors>
                                : ""}
                            <div className="form-group">
                                <label htmlFor="username" id="usernameText">Username</label>
                                <input type="text" className="form-control" id="username" name="username"
                                    placeholder="Enter username" onChange={this.inputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" id="passText">Password</label>
                                <input type="password" className="form-control" id="pass" name="password" placeholder="Password" onChange={this.inputChange} />
                            </div>

                            <div className="text-center">
                                <button type="submit" id="login" className="btn btn-primary" onClick={this.loginUser}>Submit</button>
                            </div>
                        </form>


                        <div className="row mt-4 justify-content-center">
                            <div className="co-md-12" id="loginText">
                                Don't have an account yet? <a href="/signup">Sign Up</a> here.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
