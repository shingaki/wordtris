import React, { Component } from "react";
import "./style.css";


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">WordTris</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"} href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"} href="/signup">SignUp</a>
                        </li>
                        <li className="nav-item">
                            <a className={window.location.pathname === "/scores" ? "nav-link active" : "nav-link"}  href="/scores">High Scores</a>
                        </li>
                        <li className="nav-item">
                            <a className={window.location.pathname === "/play" ? "nav-link active" : "nav-link"} href="/play">Play</a>
                        </li>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Navbar;
