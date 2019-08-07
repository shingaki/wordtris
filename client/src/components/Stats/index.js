import React, {Component} from "react";
import "./style.css";
import API from "../../utils/API";
import PlayersWordsAndScores from "../PlayersWordsAndScores";
import PlayersHighestScores from "../PlayersHighestScores";


class Stats extends Component {

    state = {

        playerWordsAndScores: [],
        playerHighestScores: [],


    }

    componentWillMount = () => {
        API.getPlayersWordsAndScores().then(response => {
            var strPlayerWordsAndScores = JSON.stringify(response.data);
            this.setState({
                playerWordsAndScores: JSON.parse(strPlayerWordsAndScores)
            })

            API.getPlayersHighestScores().then(response => {
                var strPlayerHighestScores = JSON.stringify(response.data);
                this.setState({
                    playerHighestScores: JSON.parse(strPlayerHighestScores)
                })
            })


            if (this.state.playerWordsAndScores.length > 0) {
                console.log(this.state.playerWordsAndScores[0].playerWord);
            }


        })
    }


    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Stats</h1>

                {/* Global Stats */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6 mb-3">
                        <div className="score-container">
                            <h3 className="stat-header">Global High Scores</h3>
                            <div className="row">
                                <div className="col-md-1 score-chart">1.</div>
                                <div className="col-md-6 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Score</div>
                            </div>
                            <div className="row odd-row">
                                <div className="col-md-1 score-chart">2.</div>
                                <div className="col-md-6 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Score</div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 score-chart">3.</div>
                                <div className="col-md-6 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Score</div>
                            </div>
                            <div className="row odd-row">
                                <div className="col-md-1 score-chart">4.</div>
                                <div className="col-md-6 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Score</div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 score-chart">5.</div>
                                <div className="col-md-6 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Score</div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="score-container">
                            <h3 className="stat-header">Global Highest Scoring Words</h3>
                            <div className="row">
                                <div className="col-md-1 score-chart">1.</div>
                                <div className="col-md-4 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Word</div>
                                <div className="col-md-3 text-right score-chart">Score</div>
                            </div>
                            <div className="row odd-row">
                                <div className="col-md-1 score-chart">2.</div>
                                <div className="col-md-4 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Word</div>
                                <div className="col-md-3 text-right score-chart">Score</div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 score-chart">3.</div>
                                <div className="col-md-4 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Word</div>
                                <div className="col-md-3 text-right score-chart">Score</div>
                            </div>
                            <div className="row odd-row">
                                <div className="col-md-1 score-chart">4.</div>
                                <div className="col-md-4 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Word</div>
                                <div className="col-md-3 text-right score-chart">Score</div>
                            </div>
                            <div className="row">
                                <div className="col-md-1 score-chart">5.</div>
                                <div className="col-md-4 score-chart">Player Name</div>
                                <div className="col-md-4 text-right score-chart">Word</div>
                                <div className="col-md-3 text-right score-chart">Score</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Player's Stats */}
                {this.props.loggedin ?
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-6 mb-3">
                            <div className="playerscore-container">
                                <h3 className="stat-header">Player's High Scores</h3>
                                <PlayersHighestScores
                                    playerHighestScores={this.state.playerHighestScores}
                                />
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-1 score-chart">1.</div>*/}
                                {/*    <div className="col-md-4 score-chart">Score</div>*/}
                                {/*</div>*/}
                                {/*<div className="row odd-row">*/}
                                {/*    <div className="col-md-1 score-chart">2.</div>*/}
                                {/*    <div className="col-md-4 score-chart">Score</div>*/}
                                {/*</div>*/}
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-1 score-chart">3.</div>*/}
                                {/*    <div className="col-md-4 score-chart">Score</div>*/}
                                {/*</div>*/}
                                {/*<div className="row odd-row">*/}
                                {/*    <div className="col-md-1 score-chart">4.</div>*/}
                                {/*    <div className="col-md-4 score-chart">Score</div>*/}
                                {/*</div>*/}
                                {/*<div className="row">*/}
                                {/*    <div className="col-md-1 score-chart">5.</div>*/}
                                {/*    <div className="col-md-4 score-chart">Score</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className="col-md-6 mb-3">
                            <div className="playerscore-container">
                                <h3 className="stat-header">Player's Highest Scoring Words</h3>
                                    <PlayersWordsAndScores
                                        playerWordsAndScores={this.state.playerWordsAndScores}
                                />
                            </div>
                        </div>
                    </div>
                    : ""
                }

            </div>
        );
    }
}

export default Stats;
