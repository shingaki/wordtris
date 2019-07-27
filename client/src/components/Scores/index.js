import React, { Component } from "react";
import "./style.css";

class Scores extends Component {

    render() {
        return (
            <div className="row score-container">
                <div className="col-md-12 mt-2">
                    <h4>Level: {this.props.score}</h4>
                    <h4>Score: {this.props.level}</h4>
                </div>
            </div>
        );
    }
}

export default Scores;
