import React, { Component } from "react";
import "./style.css";

class Scores extends Component {

    render() {
        return (
            <div className="row justify-content-center">
                <div className="score-container">
                    <div className="col-md-12 mt-2">
                        <h4>Level: {this.props.level}</h4>
                        <h4>Score: {this.props.score}</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scores;
