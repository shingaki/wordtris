import React, { Component } from "react";
import "./style.css";

class SignUp extends Component {
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
                                <label for="username" id="usernameText">Username</label>
                                <input type="text" className="form-control" id="username"
                                    placeholder="Enter a username" />
                            </div>
                            <div className="form-group">
                                <label for="email" id="usernameText">Email</label>
                                <input type="email" className="form-control" id="email"
                                    placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label for="pass" id="passText">Password</label>
                                <input type="password" className="form-control" id="pass" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label for="pass2" id="passText">Re-enter Password</label>
                                <input type="password" className="form-control" id="pass2" placeholder="Re-enter Password" />
                            </div>

                            <div className="text-center">
                                <button type="submit" id="login" className="btn btn-primary">Submit</button>
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
