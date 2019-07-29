import React, { Component } from "react";
import "./style.css";
import Next from "../Next";
import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";

const nextList = [];

class Play extends Component {

    state = {
        score: 0,
        level: 1,
        fallSpeed: 250,
        currentPieceX: 100,
        currentColumn: 4,
        numLettersPerColumn: [0,0,0,0,0,0,0,0,0,2],
        currentPieceY: 0,
        pieceSpeed: 0,
        isCurrentPiecePlaced: false,
        currentPieceID: 0,
        nextUp: [],
        playLetters: [],
        placedLetters: []
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

    initialSetup = () => {
        var nextList = [];
        var playNow = [];
        // generate next up three letters
        for (var i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 26);
            let randomLetter = this.letters[random];
            // save each letter and its score
            nextList.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter]
            })
        }

        // generate play now three letters
        for (var i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 26);
            let randomLetter = this.letters[random];
            // save each letter and its score
            playNow.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter]
            })
        }
        console.log(nextList);
        // move next up letters to play letters
        // save new next up letters
        this.setState({
            playLetters: playNow,
            nextUp: nextList
        })

        let playLetters = this.state.playLetters
        console.log(playLetters[0])

        var emptyBoard = []
        for (var i = 0; i < 200; i++) {
            emptyBoard.push({
                letter: "",
                points: this.letterPoints[""]
            })
        }
        emptyBoard[199].letter = "Z"
        emptyBoard[199].points = this.letterPoints["Z"]
        emptyBoard[189].letter = "B"
        emptyBoard[189].points = this.letterPoints["B"]
        
        this.setState({placedLetters : emptyBoard})
        // console.log("empty board = " + JSON.stringify(emptyBoard))
        // console.log("placed letters array = " + this.state.placedLetters)
        
    }

    pickNewLetters = () => {
        var nextList = [];
        // generate three letters
        for (var i = 0; i < 3; i++) {
            var random = Math.floor(Math.random() * 26);
            var randomLetter = this.letters[random];
            // save each letter and its score
            nextList.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter]
            })
        }
        console.log(nextList);
        // move next up letters to play letters
        // save new next up letters
        this.setState({
            playLetters: this.state.nextUp,
            nextUp: nextList
        })
    }

    placeLetters = () => {

    }

    componentDidMount = () => {
        // initial setup
        this.initialSetup();
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
        if (this.state.currentPieceY < 425 - 25 * this.state.numLettersPerColumn[this.state.currentColumn]) {
            this.setState({ currentPieceY: this.state.currentPieceY + 25 })
        }
    }

    leftClick = () => {
        if (this.state.currentPieceX > 0) {
            this.setState({ currentPieceX: this.state.currentPieceX - 25 })
            this.setState({ currentColumn: this.state.currentColumn - 1 })
        }
    }

    rightClick = () => {
        if (this.state.currentPieceX < 225) {
            this.setState({ currentPieceX: this.state.currentPieceX + 25 })
            this.setState({ currentColumn: this.state.currentColumn + 1 })
        }
    }

    tick() {
        if (this.state.currentPieceY < 425 - 25 * this.state.numLettersPerColumn[this.state.currentColumn]){
            this.setState({ pieceSpeed: 750})
            this.setState({ currentPieceY: this.state.currentPieceY + 5 })
        } else {
            clearInterval(this.timerID);
            this.setState({ isCurrentPiecePlaced: true})
            this.setState({ pieceSpeed: 0})
            this.setState({ currentPieceX: 100 })
            console.log(this.state.currentColumn)
            this.setState({ currentColumn: 4 }) 
            this.setState({ currentPieceY: 0 })  
            this.endOfRound()

        }
    }



    endOfRound = () => {
        // pick new "next up" letters, move next up to play now
        this.pickNewLetters();
        // save dropping piece at its ending position as new pieces
        this.placeLetters();
        // move dropping piece back to top
    }
  
    
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Play</h1>

                <div className="row">
                    <div className="col-md-2 text-center">
                        <Next pickNewLetters={this.pickNewLetters} nextUp={this.state.nextUp} />
                    </div>
                    <div className="col-md-7 text-center">
                        <GameArea 
                            currentPieceX={this.state.currentPieceX}
                            currentPieceY={this.state.currentPieceY} 
                            pieceSpeed = {this.state.pieceSpeed}
                            isCurrentPiecePlaced={this.state.isCurrentPiecePlaced}   
                            currentPieceID={this.state.currentPieceID}
                            pickNewLetters={this.pickNewLetters}          
                            endOfRound={this.endOfRound}
                            playLetters={this.state.playLetters}    
                            placedLetters={this.state.placedLetters}       
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
                {/* <div>Next up: {this.state.nextUp[0]}, {this.state.nextUp[1]}, {this.state.nextUp[2]}</div> */}
                {/* <div>Playing now: {this.state.playLetters[0].letter}, {this.state.playLetters[1].letter}, {this.state.playLetters[2].letter}</div> */}
                <button onClick={this.pickNewLetters}>NEW LETTERS</button>

            </div>
    
        );
    }
}

export default Play;
