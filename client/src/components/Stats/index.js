import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import FormErrors from "../FormErrors";

class Login extends Component {

    state = {

    }

    

    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Stats</h1>

                {/* Global Stats */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6 mb-3">
                        <h3>Global High Scores</h3>
                        <div className="row">
                            <div className="col-md-1 score-chart">1.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Score</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">2.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Score</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">3.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Score</div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-3">
                        <h3>Global Highest Scoring Words</h3>
                        <div className="row">
                            <div className="col-md-1 score-chart">1.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Word</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">2.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Word</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">3.</div>
                            <div className="col-md-6 score-chart">Player Name</div>
                            <div className="col-md-4 text-right score-chart">Word</div>
                        </div>

                    </div>
                </div>

                {/* Player's Stats */}
                <div className="row justify-content-center">
                    <div className="col-md-6 mb-3">
                        <h3>Player's High Scores</h3>
                        <div className="row">
                            <div className="col-md-1 score-chart">1.</div>
                            <div className="col-md-4 score-chart">Score</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">2.</div>
                            <div className="col-md-4 score-chart">Score</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">3.</div>
                            <div className="col-md-4 score-chart">Score</div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-3">
                        <h3>Player's Highest Scoring Words</h3>
                        <div className="row">
                            <div className="col-md-1 score-chart">1.</div>
                            <div className="col-md-4 score-chart">Word</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">2.</div>
                            <div className="col-md-4 score-chart">Word</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1 score-chart">3.</div>
                            <div className="col-md-4 score-chart">Word</div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Login;
