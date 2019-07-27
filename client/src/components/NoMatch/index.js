import React, { Component } from "react";
import "./style.css";

class NoMatch extends Component {

    render() {
        return (
            <div className="container text-center mt-5">
                <h3>Not Found</h3>
                <p>Sorry, we couldn't find that page.</p>
            </div>
        );
    }
}

export default NoMatch;
