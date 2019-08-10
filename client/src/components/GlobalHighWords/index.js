import React, {Component} from "react";
import "./style.css";


class GlobalHighWords extends Component {
    render() {
        return (
            <div>
                <div className="row font-weight-bold col-header">
                    <div className="col-lg-1 col-md-1 score-chart">Rank</div>
                    <div className="col-lg-4 col-md-4 score-chart">Player</div>
                    <div className="col-lg-4 col-md-4 score-chart">Word</div>
                    <div className="col-lg-3 col-md-2 score-chart text-right">Points</div>

                </div>
                {this.props.globalHighWords.map((item, i) => {
                    const rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor}>
                            <div className="col-lg-1 col-md-1 score-chart">{item.scorePosition}.</div>
                            <div className="col-lg-4 col-md-4 score-chart">{item.Player.playerName}</div>
                            <div className="col-lg-4 col-md-4 score-chart">{item.highestWord}</div>
                            <div className="col-lg-3 col-md-2 score-chart text-right">{item.score} {item.wordBonus ? <sup><small>W</small></sup> : ""}{item.letterBonus ? <sup><small>L</small></sup> : ""}</div>
                        </div>)
                })} </div>)

    }
}


export default GlobalHighWords;