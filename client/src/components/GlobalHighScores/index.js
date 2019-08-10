import React, {Component} from "react";
import "./style.css";


class GlobalHighScores extends Component {
    render() {
        return (
            <div>
                <div className="row font-weight-bold col-header">
                    <div className="col-md-1 score-chart">Rank</div>
                    <div className="col-md-5 score-chart">Player</div>
                    <div className="col-md-3 offset-2 score-chart text-right">Score</div>
                </div>
                {this.props.globalHighScores.map((item, i) => {
                    const rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor}>
                            <div className="col-md-1 score-chart">{item.scorePosition}.</div>
                            <div className="col-md-5 score-chart">{item.Player.playerName}</div>
                            <div className="col-md-3 offset-2 score-chart text-right">{item.highestScore}</div>
                        </div>)
                })} </div>)

    }
}


export default GlobalHighScores;