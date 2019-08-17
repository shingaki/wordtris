import React, {Component} from "react";
import "./style.css";


class PlayersWordsAndScores extends Component {
    render() {
        // console.log(this.state.playerStats.playerWordRanking)
        return (
            <div>
                <div className="row font-weight-bold col-header">
                    <div className="col-lg-1 col-md-1 score-chart">Rank</div>
                    <div className="col-lg-6 col-md-6 score-chart">Word</div>
                    <div className="col-lg-5 col-md-4 text-right score-chart">Points</div>
                </div>
                {this.props.playerWordsAndScores.map((item, i) => {
                    let rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor} key={i}>
                            <div className="col-lg-1 col-md-1 score-chart">{item.playerWordRanking}.</div>
                            <div className="col-lg-6 col-md-6 score-chart">{item.playerWord}</div>
                            <div className="col-lg-5 col-md-4 text-right score-chart">{item.wordPoints} {item.wordBonus ? <sup><small>W</small></sup> : ""}{item.letterBonus ? <sup><small>L</small></sup> : ""}</div>
                        </div>)
                })} </div>)

    }
}


export default PlayersWordsAndScores;




