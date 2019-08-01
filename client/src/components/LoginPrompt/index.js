import React, { Component } from "react";
import "./style.css";

class LoginPrompt extends Component {

    render() {
        return (
            <div className="container text-center mt-5">
                <h3>You're not logged in!</h3>
                <p>To play the game, you need to <a href="login" className="alink">login.</a></p>
            </div>
        );
    }
}

export default LoginPrompt;
