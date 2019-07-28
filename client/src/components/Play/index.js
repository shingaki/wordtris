import React, { Component } from "react";
import "./style.css";
import Next from "../Next";
import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";

class Play extends Component {

    state = {
        score: 0,
        level: 1,
        fallSpeed: 250,
        currentPieceX: 0,
        currentPieceY: 0,
        isCurrentPiecePlaced: false,
        currentPieceID: 0
    }

    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    letterPoints = {
        A: 1,
        B: 3,
        C: 3,
        D: 2,
        E: 1,
        F: 4,
        G: 2,
        H: 4,
        I: 1,
        J: 8,
        K: 5,
        L: 1,
        M: 3,
        N: 1,
        O: 1,
        P: 3,
        Q: 10,
        R: 1,
        S: 1,
        T: 1,
        U: 1,
        V: 4,
        W: 4,
        X: 8,
        Y: 4,
        Z: 10
    }

    pickThreeLetters = () => {
        // console.log()
        console.log(this.letterPoints[this.letters[0]])
    }

    componentDidMount = () => {
        this.pickThreeLetters();
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
        if (this.state.currentPieceY < 425) {
            this.setState({ currentPieceY: this.state.currentPieceY + 25 })
        }
    }

    leftClick = () => {
        if (this.state.currentPieceX > 0) {
            this.setState({ currentPieceX: this.state.currentPieceX - 25 })
        }
    }

    rightClick = () => {
        if (this.state.currentPieceX < 225) {
            this.setState({ currentPieceX: this.state.currentPieceX + 25 })
        }
    }

    tick() {
        if (this.state.currentPieceY < 425){
          this.setState({ currentPieceY: this.state.currentPieceY + 5 })
        } else {
        //   clearInterval(this.timerID);
          this.setState({ isCurrentPiecePlaced: true})
          this.setState({ currentPieceX: 0 })
          this.setState({ currentPieceY: -25 })  
        }
        console.log(this.state)
    }
  
    
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Play</h1>

                <div className="row">
                    <div className="col-md-2 text-center">
                        <Next />
                    </div>
                    <div className="col-md-7 text-center">
                        <GameArea 
                            currentPieceX={this.state.currentPieceX}
                            currentPieceY={this.state.currentPieceY} 
                            isCurrentPiecePlaced={this.state.isCurrentPiecePlaced}   
                            currentPieceID={this.state.currentPieceID}           
                        />
                        
                    </div>
                    <div className="col-md-3">
                        <Scores score={this.state.score} level={this.state.level} />

                        <Controls 
                            startClick={this.startClick} 
                            stopClick={this.stopClick} 
                            increaseClick={this.increaseClick} 
                            downClick={this.downClick} 
                            leftClick={this.leftClick} 
                            rightClick={this.rightClick} 
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default Play;
