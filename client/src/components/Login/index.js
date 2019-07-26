import React, { Component } from "react";
import "./style.css";

class Login extends Component {
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Login</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="mt-3">
                            <div style={{ display: "none" }} className="login-error">
                                <p style={{ fontWeight: "bold", color: "red" }}>Incorrect Username or password. Try again.</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" id="usernameText">Username</label>
                                <input type="text" className="form-control" id="username"
                                    placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass" id="passText">Password</label>
                                <input type="password" className="form-control" id="pass" placeholder="Password" />
                            </div>

                            <div className="text-center">
                                <button type="submit" id="login" className="btn btn-primary">Submit</button>
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
