import React, {Component} from "react";
import "./style.css";


class PlayersHighestScores extends Component {
    render() {
        return (
            <div>
                <div className="row font-weight-bold col-header">
                    <div className="col-md-1 score-chart">Rank</div>
                    <div className="col-md-3 score-chart">Score</div>
                </div>
                {this.props.playerHighestScores.map((item, i) => {
                    const rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor}>
                            <div className="col-md-1 score-chart">{item.playerScoreRanking}.</div>
                            <div className="col-md-3 score-chart">{item.playerScore}</div>
                        </div>)
                })} </div>)

    }
}


export default PlayersHighestScores;




