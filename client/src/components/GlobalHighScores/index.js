import React, {Component} from "react";
import "./style.css";


class GlobalHighScores extends Component {
    render() {
        return (
            <div>
                {this.props.globalHighScores.map((item, i) => {
                    const rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor}>
                            <div className="col-md-1 score-chart">{item.scorePosition}.</div>
                            <div className="col-md-2 score-chart">{item.Player.playerName}</div>
                            <div className="col-md-2 score-chart">{item.word}</div>
                            <div className="col-md-1 score-chart">{item.highestScore}</div>
                        </div>)
                })} </div>)

    }
}


export default GlobalHighScores;