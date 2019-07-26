import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"

class SignUp extends Component {

    state = {
        username: "",
        email: "",
        password1: "",
        password2: ""
    }

    inputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    submitForm = event => {
        event.preventDefault();
        const username = this.state.username;
        const email = this.state.email;
        const password1 = this.state.password1;
        const password2 = this.state.password2;

        if (password1 === password2) {
            API.createUser(username, email, password1);
        } else {
            // error passwords don't match
            document.getElementsByClassName("signup-error")[0].style.display = "block";
        }
        
    }

    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Sign Up</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="mt-3">
                            <div style={{ display: "none" }} className="signup-error">
                                <p style={{ fontWeight: "bold", color: "red" }}>Passwords don't match. Please enter your password twice.</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" id="usernameText">Username</label>
                                <input type="text" className="form-control" id="username" name="username"
                                    placeholder="Enter a username" value={this.username} onChange={this.inputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" id="usernameText">Email</label>
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
