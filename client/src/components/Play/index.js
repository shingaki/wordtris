import React, { Component } from "react";
import Piece from "../Piece"
import "./style.css";
import Next from "../Next";
// import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";

class Play extends Component {

    state = {
        score: 0,
        level: 1,
        fallSpeed: 2000,
        x: 0,
        y: 0,
    }

    startClick = () => {
        this.timerID = setInterval(
            () => this.tick(),
            this.state.fallSpeed
        );
    }

    stopClick = () => {
        clearInterval(this.timerID);
    }

    increaseClick = () => {
        this.setState({ fallSpeed: this.state.fallSpeed / 2 })
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.tick(),
            this.state.fallSpeed
        );
    }

    downClick = () => {
        if (this.state.y < 425) {
            this.setState({ y: this.state.y + 25 })
        }
    }

    leftClick = () => {
        if (this.state.x > 0) {
            this.setState({ x: this.state.x - 25 })
        }
    }

    rightClick = () => {
        if (this.state.x < 225) {
            this.setState({ x: this.state.x + 25 })
        }
    }
  
    
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Play</h1>

                <div className="row">
                    <div className="col-md-2">
                        <Next />
                    </div>
                    <div className="col-md-7">
                        {/* <GameArea /> */}
                        <Piece />
                    </div>
                    <div className="col-md-3">
                        <Scores score={this.state.score} level={this.state.level} />

                        <Controls startClick={this.startClick} stopClick={this.stopClick} increaseClick={this.increaseClick} downClick={this.downClick} leftClick={this.leftClick} rightClick={this.rightClick} />
                    </div>
                </div>

            </div>
        );
    }
}

export default Play;
