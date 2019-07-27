import React, { Component } from "react";
import Piece from "../Piece"
import "./style.css";
// import NextPiece from "../NextPiece";
// import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";

class Play extends Component {

    state = {
        score: 0,
        level: 1
    }
  
    
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Play</h1>

                <div className="row">
                    <div className="col-md-2">
                        {/* <NextPiece /> */}
                    </div>
                    <div className="col-md-6">
                        {/* <GameArea /> */}
                    </div>
                    <div className="col-md-4">
                        <Scores score={this.state.score} level={this.state.level} />

                        <div className="row">
                            <div className="col-md-12">
                                <Controls />
                            </div>
                        </div>
                    </div>
                </div>

                <Piece />
                



            </div>
        );
    }
}

export default Play;
