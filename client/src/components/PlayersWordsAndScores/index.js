import React, {Component} from "react";
import "./style.css";


class PlayersWordsAndScores extends Component {
    render() {
        // console.log(this.state.playerStats.playerWordRanking)
        return (
            <div>
                {this.props.playerWordsAndScores.map((item, i) => {
                    const rowColor = i % 2 === 0 ? 'row even-row' : 'row odd-row'
                    return (
                        <div className={rowColor}>
                            <div className="col-md-1 score-chart">{item.playerWordRanking}.</div>
                            <div className="col-md-3 score-chart">{item.playerWord}</div>
                            <div className="col-md-3 text-right score-chart">Score:  {item.wordPoints}</div>
                        </div>)
                })} </div>)

    }
}


export default PlayersWordsAndScores;




