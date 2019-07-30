import React, { Component } from "react";
import "./style.css";
import Next from "../Next";
import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";
import API from "../../utils/API";

const nextList = [];

class Play extends Component {

    state = {
        score: 0,
        level: 1,
        fallSpeed: 250,
        currentPieceX: 100,
        currentColumn: 4,
        numLettersPerColumn: [0,0,0,0,0,0,0,0,0,0],
        currentPieceY: 0,
        pieceSpeed: 0,
        currentPieceID: 0,
        nextUp: [],
        playLetters: [],
        placedLetters: [],
        newPlacedLetters: [],
        possibleWords: [],
        word: ""
    }

    inputChange = event => {
        this.setState({
            error: ""
        })
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    // weights = [10, 8, 8, 9, 10, 7, 9, 7, 10, 8, 5, 10, 8, 10, 10, 8, 1, 10, 10, 10, 10, 7, 7, 3, 7, 1]
    weights = [67, 12, 28, 32, 104, 20, 16, 42, 63, 1, 5, 34, 21, 60, 64, 18, 1, 52, 54, 77, 23, 9, 14, 2, 14, 1]

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

    makeWeightedArray = (array, weights) => {
        let weightedArray = [];
        // Loop over weights
        for (let i = 0; i < weights.length; i++) {
            // let multiples = weights[i] * 100;
            let multiples = weights[i];

            // Loop over the array of letters - adding each letter in x times for its weight
            for (let j = 0; j < multiples; j++) {
                weightedArray.push(array[i]);
            }
        }
        return weightedArray;
    }

    // make array where each letter is weighted
    weightedLetters = this.makeWeightedArray(this.letters, this.weights);

    initialSetup = () => {
        var nextList = [];
        var playNow = [];
        console.log(this.weightedLetters);
        // generate next up three letters
        for (var i = 0; i < 3; i++) {
            // let random = Math.floor(Math.random() * this.letters.length);
            let random = Math.floor(Math.random() * this.weightedLetters.length);
            let randomLetter = this.weightedLetters[random];
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
        // console.log(nextList);
        // move next up letters to play letters
        // save new next up letters
        this.setState({
            playLetters: playNow,
            nextUp: nextList
        })

        let playLetters = this.state.playLetters
        // console.log(playLetters[0])

        //creates empthy array representing the game board
        var emptyBoard = []
        for (var i = 0; i < 200; i++) {
            emptyBoard.push({
                letter: "",
                points: this.letterPoints[""]
            })
        }

        //set intial state of game board
        this.setState({placedLetters : emptyBoard})
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
        // console.log(nextList);
        // move next up letters to play letters
        // save new next up letters
        this.setState({
            playLetters: this.state.nextUp,
            nextUp: nextList
        })
    }

    placeLetters = () => {
        var myBoard = [];
        var colmuns = [];
        var myPlacedLetters = [];

        //get current heights of gameboard columns
        for (let x = 0; x<10; x++) {
            colmuns[x] = this.state.numLettersPerColumn[x]
        }

        //get letters on gameboard
        for (let x = 0; x<200; x++) {
            myBoard[x] = this.state.placedLetters[x]
        }
        
        //get height of current column, and identify where the letters in current piece will be placed
        var myColumnHeight = this.state.numLettersPerColumn[this.state.currentColumn]
        var topLetterSpot = (17 - myColumnHeight)*10 + this.state.currentColumn
        var midLetterSpot = topLetterSpot + 10
        var botLetterSpot = midLetterSpot + 10
        
        //add letters of current piece to board
        myBoard[topLetterSpot] = this.state.playLetters[0]
        myBoard[midLetterSpot] = this.state.playLetters[1]
        myBoard[botLetterSpot] = this.state.playLetters[2]

        //add positions of newly placed letters to state to be accessed by buildPossibleWordsArray()
        myPlacedLetters = [topLetterSpot, midLetterSpot, botLetterSpot]
        //increase the saved height of current column for later use
        colmuns[this.state.currentColumn] = colmuns[this.state.currentColumn] + 3

        //set states
        this.setState({ newPlacedLetters : myPlacedLetters})
        this.setState({ numLettersPerColumn : colmuns})
        this.setState({ placedLetters : myBoard })
        // console.log(JSON.stringify(this.state.newPlacedLetters))
        // console.log("my board = " + JSON.stringify(this.state.placedLetters))
    }

    componentDidMount = () => {
        // initial setup
        this.initialSetup();
    }


    startClick = () => {
        //begins falling of first piece
        this.timerID = setInterval(
            () => this.tick(),
            this.state.fallSpeed
        );
    }

    stopClick = () => {
        //stops current piece from falling (only used during dev)
        clearInterval(this.timerID);
    }

    increaseClick = () => {
        //increases fallSpeed
        this.setState({ fallSpeed: this.state.fallSpeed / 2 })
        clearInterval(this.timerID);
        this.timerID = setInterval(
            () => this.tick(),
            this.state.fallSpeed
        );
    }

    downClick = () => {
        //moves current piece down the 1 letter block in distance
        if (this.state.currentPieceY < 425 - 25 * this.state.numLettersPerColumn[this.state.currentColumn]) {
            this.setState({ currentPieceY: this.state.currentPieceY + 25 })
        }
    }

    leftClick = () => {
        //moves current piece left one column, checks to make sure current piece is clear of already placed letters and isn't at edge of gameboard
        if (this.state.currentPieceX > 0 && this.state.currentPieceY < 430 - 25 * this.state.numLettersPerColumn[this.state.currentColumn - 1]) {
            this.setState({ currentPieceX: this.state.currentPieceX - 25 })
            this.setState({ currentColumn: this.state.currentColumn - 1 })
        }
    }

    rightClick = () => {
        //moves current piece right one column, checks to make sure current piece is clear of already placed letters and isn't at edge of gameboard
        if (this.state.currentPieceX < 225 && this.state.currentPieceY < 430 - 25 * this.state.numLettersPerColumn[this.state.currentColumn + 1]) {
            this.setState({ currentPieceX: this.state.currentPieceX + 25 })
            this.setState({ currentColumn: this.state.currentColumn + 1 })
        }
    }

    cycleClick = () => {
        //cycles the letters of the current piece
        var cycleLetters = [];
        cycleLetters[0] = this.state.playLetters[2]
        cycleLetters[1] = this.state.playLetters[0]
        cycleLetters[2] = this.state.playLetters[1]
        this.setState({
            playLetters: cycleLetters
        })
    }

    tick() {
        //moves the current piece down, checks the height of current column to make sure piece shouldn't be placed before bottom of gameboard
        if (this.state.currentPieceY < 425 - 25 * this.state.numLettersPerColumn[this.state.currentColumn]){
            this.setState({ pieceSpeed: 750}) //confirm visual effect of piece moving downward... this is set to 0 after piece is placed and goes to top as "new piece"
            this.setState({ currentPieceY: this.state.currentPieceY + 5 })
        } else {
            this.endOfRound() //piece is placed
        }
    }

    updatePlacedLetters = () => {
        //adds placed pieces to gameboard so that it can be visually updated 
        var myBoard = [];
        for (let x = 0; x<200; x++) {
            myBoard[x] = this.state.placedLetters[x]
        }
        myBoard[0] = this.state.playLetters[0]
        myBoard[1] = this.state.playLetters[1]
        myBoard[2] = this.state.playLetters[2]
        // console.log("my board = " + JSON.stringify(this.state.placedLetters))
        this.setState({ placedLetters : myBoard })
    }

    wordValue = (myWord) => {
        //gets value of myWord
        let myValue = 0;
        for (let x = 0; x < myWord.length; x++) {
            myValue = myValue + this.letterPoints[myWord[x]]
        }
        return myValue
    }

    buildHorizontalWordFromBoard = (start, stop) => {
        //using state.placedLetters, builds a string based on given start & stop position (horizontal)
        let myWord = ""

        if ((this.state.placedLetters[start].letter !== "") && this.state.placedLetters[stop].letter !== "") {
            for (let x = start; x <= stop; x++) {
                if (this.state.placedLetters[x].letter == "") { 
                    //if there is a black space between start and stop, return empty string, 
                    //this tells the function that called it that there wasn't a valid word between start and stop
                    return "" 
                } else {
                    myWord = myWord + this.state.placedLetters[x].letter //build string
                }
            }
            // console.log(myWord)
            return myWord;
        }
        return myWord
    }

    buildVerticalWordFromBoard = (start, stop) => {
        //using state.placedLetters, builds a string based on given start & stop position (vertical)
        let myWord = ""

        for (let x = start; x <= stop; x=x+10) {
            myWord = myWord + this.state.placedLetters[x].letter
        }
        // console.log(myWord)
        return myWord;
    }

    buildPossibleWordsArray = () => {
        let myPossibleWords = [];
        let currentWord = "";
        let currentLetter;
        let minLetter; 
        let maxLetter; 

        for (let x = 0; x < 3; x++) { //loops 3 times, once for each new placed letter
            currentLetter = this.state.newPlacedLetters[x];
            
            //adds all horizontal words to myPossibleWords
            //set paramenters of current row to be evaluated
            minLetter = currentLetter - (currentLetter % 10);  //first spot on current row
            maxLetter = minLetter + 10; //last spot on current row
            //nested for loop runs through all combinations of minLetter & maxLetter
            for (let firstLetter = minLetter; firstLetter <= currentLetter; firstLetter++) {
                for (let lastLetter = currentLetter; lastLetter < maxLetter; lastLetter++) {
                    if (!(firstLetter < currentLetter && lastLetter < currentLetter) && !(firstLetter > currentLetter && lastLetter > currentLetter) && (lastLetter-firstLetter >=2)) {
                        //above if statement makes sure current letter is included in evaluation
                        //and >=2 insures that word is 3 letters or more
                        currentWord = this.buildHorizontalWordFromBoard(firstLetter, lastLetter); //convert letters on board into string
                        if (currentWord !== "") { 
                            myPossibleWords.push({ //push string and other values to array
                                value: this.wordValue(currentWord.trim()),
                                word: currentWord,
                                start: firstLetter,
                                end: lastLetter,
                                type: "horizontal"
                            })
                        }
                    }
                }
            }
            
            //adds all vertical words to myPossibleWords
            //set paramenters of current row to be evaluated
            minLetter = currentLetter  
            maxLetter = 190 + this.state.currentColumn; //bottom of current column
            //nested for loop runs through all combinations of minLetter & maxLetter
            for (let firstLetter = minLetter; firstLetter <= currentLetter; firstLetter=firstLetter+10) {
                for (let lastLetter = currentLetter; lastLetter <= maxLetter; lastLetter=lastLetter+10) {
                    if (!(firstLetter < currentLetter && lastLetter < currentLetter) && !(firstLetter > currentLetter && lastLetter > currentLetter) && (lastLetter-firstLetter >=20)) {
                        //above if statement makes sure current letter is included in evaluation
                        //and >=20 insures that word is 3 letters or more
                        currentWord = this.buildVerticalWordFromBoard(firstLetter, lastLetter);
                        if (currentWord !== "") { 
                            myPossibleWords.push({ //push string and other values to array
                                value: this.wordValue(currentWord.trim()),
                                word: currentWord,
                                start: firstLetter,
                                end: lastLetter,
                                type: "vertical"
                            })
                        }
                    }
                }
            }
        }

        //sort myPossibleWords array by descending value
        myPossibleWords.sort((a, b) => (a.value < b.value) ? 1 : -1)
        //set state with possibleWords array
        this.setState({ possibleWords : myPossibleWords })
        console.log(this.state.possibleWords)
        
    }


    endOfRound = () => {
        
        // save dropping piece at its ending position as new pieces
        this.placeLetters();
        //build array of possible words should be ordered in decreasing point value
        this.buildPossibleWordsArray();
        //go through array of posisble words to check if there is a word
        //give points for word
        //remove letters used from board and update column heights
        
        if (this.state.numLettersPerColumn[this.state.currentColumn] < 21) {
            // pick new "next up" letters, move next up to play now
            this.pickNewLetters();
            // move dropping piece back to top
            this.setState({ pieceSpeed: 0}) //so piece doesn't visually move to top of board
            this.setState({ currentPieceX: 100 }) //set starting X position
            this.setState({ currentColumn: 4 }) //set starting column
            this.setState({ currentPieceY: 0 }) //set starting Y position 
            this.setState({ pieceSpeed: 750}) //reset visual effect for falling piece
        } else {
            //Game over
            //Modal?? - with option to play again??
            //check to see if there is a new highscore
            //check to see if there is a new high word
            
            clearInterval(this.timerID); //Stop falling effect of moving piece
        }

    }

    checkIfItIsAWord = event => {
        event.preventDefault();
        const word = this.state.word;
        console.log("what is the word " + word);

        API.checkWord(word).then(wordData => {
            // if login data is correct
            console.log(this.props);
            if (wordData.data !== false) {
                // update logged in state - redirect to play page?
                console.log("word exists from client");
            } else {
                console.log("word does not exists from client");
            }
    })
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
                            cycleClick={this.cycleClick} 
                            rightClick={this.rightClick} 
                        />
                    </div>
                </div>
                {/* <div>Next up: {this.state.nextUp[0]}, {this.state.nextUp[1]}, {this.state.nextUp[2]}</div> */}
                {/* <div>Playing now: {this.state.playLetters[0].letter}, {this.state.playLetters[1].letter}, {this.state.playLetters[2].letter}</div> */}
                <button onClick={this.pickNewLetters}>NEW LETTERS</button>

                {/*The below is only used to test the Trie logic*/}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8">
                        <form className="mt-3">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="word" id="wordText">Enter Word</label>
                                    <input type="text" className="form-control" id="word" name="word"
                                           placeholder="Enter A Word" onChange={this.inputChange}/>
                                </div>

                                <div className="text-center">
                                    <button type="submit" id="checkword" className="btn btn-primary"
                                            onClick={this.checkIfItIsAWord}>Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                

            </div>
    
        );
    }
}

export default Play;
