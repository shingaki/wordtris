import React, {Component} from "react";
import "./style.css";
import API from "../../utils/API";
import PlayersWordsAndScores from "../PlayersWordsAndScores";
import PlayersHighestScores from "../PlayersHighestScores";
import GlobalHighScores from "../GlobalHighScores";
import GlobalHighWords from "../GlobalHighWords";




class Stats extends Component {

    state = {

        playerWordsAndScores: [],
        playerHighestScores: [],
        globalHighScores: [],
        globalHighWords: [],
    }

    componentWillMount = () => {
        API.getPlayersWordsAndScores().then(response => {
            var strPlayerWordsAndScores = JSON.stringify(response.data);
            this.setState({
                playerWordsAndScores: JSON.parse(strPlayerWordsAndScores)
            })
            console.log("playerWordsAndScores: " + this.state.playerWordsAndScores)
        })

        API.getPlayersHighestScores().then(response => {
            var strPlayerHighestScores = JSON.stringify(response.data);
            this.setState({
                playerHighestScores: JSON.parse(strPlayerHighestScores)
            })
        })

        API.getGlobalHighScores().then(response => {
            var strGlobalHighScores = JSON.stringify(response.data);
            this.setState({
                globalHighScores: JSON.parse(strGlobalHighScores)
            })
            // console.log(this.state.globalHighScores);
        })

        API.getGlobalHighWords().then(response => {
            var strGlobalHighWords = JSON.stringify(response.data);
            this.setState({
                globalHighWords: JSON.parse(strGlobalHighWords)
            })
            console.log(this.state.globalHighWords);
        })


        if (this.state.globalHighScores.length > 0) {
            console.log(this.state.globalHighScores[0].playerName);
        }
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
                            <GlobalHighScores
                                globalHighScores={this.state.globalHighScores}
                            />
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <div className="score-container">
                            <h3 className="stat-header">Global Highest Scoring Words</h3>
                            <GlobalHighWords
                                globalHighWords={this.state.globalHighWords}
                            />
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
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <sup><small>W</small></sup>: word bonus <br />
                            <sup><small>L</small></sup>: letter bonus
                        </div>
                    </div>

            </div>
        );
    }
}

export default Stats;
