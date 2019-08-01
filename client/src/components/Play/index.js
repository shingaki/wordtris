import React, { Component } from "react";
import "./style.css";
import Next from "../Next";
import Found from "../Found";
import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";
import API from "../../utils/API";
import GameInstructions from "../GameInstructions";

class Play extends Component {

    state = {
        instructions: true,
        playGame: false,

        score: 0,
        level: 1,
        fallSpeed: 250,
        currentPieceX: 100,
        currentColumn: 4,
        numLettersPerColumn: [0,0,0,0,0,0,0,0,0,0],
        currentPieceY: -75,
        pieceSpeed: 0,
        currentPieceID: 0,
        nextUp: [],
        playLetters: [],
        placedLetters: [],
        newPlacedLetters: [],
        possibleWords: [],
        foundWordID: NaN,
        foundWord: "",
        foundWordValue: 0,
        foundWordStart: NaN,
        foundWordEnd: NaN,
        foundWordType: "",
        isGameOver: false
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

    startGame = () => {
        this.setState({
            instructions: false,
            playGame: true
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
        let myBoard = [];
        let columns = [];
        let myPlacedLetters = [];

        //get current heights of gameboard columns
        for (let x = 0; x<10; x++) {
            columns[x] = this.state.numLettersPerColumn[x]
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
        columns[this.state.currentColumn] = columns[this.state.currentColumn] + 3

        //set states
        this.setState({ newPlacedLetters : myPlacedLetters})
        this.setState({ numLettersPerColumn : columns})
        this.setState({ placedLetters : myBoard })
        // console.log(JSON.stringify(this.state.newPlacedLetters))
        // console.log("my board = " + JSON.stringify(this.state.placedLetters))
    }

    componentDidMount = () => {
        // initial setup
        this.initialSetup();
    }


    startClick = () => {
        var nextList = [];
        var playNow = [];
        // console.log(this.weightedLetters);
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
            nextUp: nextList,
        })
        
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
        let myWord = "";
        let invalidLetterCombinations = [
            "bf", "bk", "bg", "bq", "bx", "bz", 
            "cf", "cj", "cv", "cx", "cz", 
            "dx", 
            "fq", "fv", "fx", "fz",
            "gq", "gv", "gx", "gz", 
            "hx", "hz", 
            "jb", "jc", "jd", "jf", "jg", "jh", "jj", "jk", "jl", "jm", "jn", "jp", "jq", "jr", "js", "jt", "jv", "jw", "jx", "jy", "jz",
            "kj", "kq", "kv", "kx", "kz", 
            "lq", "lx", "lz", 
            "mq", "mx", "mz", 
            "nx",
            "pk", "pj", "pq", "pv", "px", "pz",
            "qa", "qb", "qc", "qd", "qe", "qf", "qg", "qh", "qi", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qr", "qs", "qt", "qv", "qw", "qx", "qy", "qz", 
            "rx", 
            "sx", "sz",
            "tq", "tx",
            "uj", "uq", "uu",
            "vb", "vc", "vd", "vf", "vg", "vh", "vj", "vk", "vl", "vm", "vn", "vp", "vq", "vt", "vu", "vv", "vw", "vx", "vz", 
            "wj", "wq", "wv", "wx", "wz", 
            "xb", "xd", "xg", "xj", "xk", "xl", "xn", "xq", "xr", "xv", "xx", "xz", 
            "yq", "yx", "yy", "yz",
            "zb", "zc", "zd", "zf", "zg", "zj", "zk", "zl", "zm", "zn", "zp", "zq", "zr", "zt", "zv", "zw", "zx"
        ];
        let current2LetterCombination;

        if ((this.state.placedLetters[start].letter !== "") && this.state.placedLetters[stop].letter !== "") {
            for (let x = start; x <= stop; x++) {
                if (x > start && this.state.placedLetters[x].letter !== "") { 
                    current2LetterCombination = this.state.placedLetters[x-1].letter + this.state.placedLetters[x].letter;
                    console.log(current2LetterCombination.toLowerCase(), invalidLetterCombinations.includes(current2LetterCombination.toLowerCase()))
                };
                if (this.state.placedLetters[x].letter === "") { 
                    //if there is a blank space between start and stop, return empty string, 
                    //this tells the function that called it that there wasn't a valid word between start and stop
                    return "" 
                } else if (x > start && invalidLetterCombinations.includes(current2LetterCombination.toLowerCase())) {
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
        let invalidLetterCombinations = [
            "bf", "bk", "bg", "bq", "bx", "bz", 
            "cf", "cj", "cv", "cx", "cz", 
            "dx", 
            "fq", "fv", "fx", "fz",
            "gq", "gv", "gx", "gz", 
            "hx", "hz", 
            "jb", "jc", "jd", "jf", "jg", "jh", "jj", "jk", "jl", "jm", "jn", "jp", "jq", "jr", "js", "jt", "jv", "jw", "jx", "jy", "jz",
            "kj", "kq", "kv", "kx", "kz", 
            "lq", "lx", "lz", 
            "mq", "mx", "mz", 
            "nx",
            "pk", "pj", "pq", "pv", "px", "pz",
            "qa", "qb", "qc", "qd", "qe", "qf", "qg", "qh", "qi", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qr", "qs", "qt", "qv", "qw", "qx", "qy", "qz", 
            "rx", 
            "sx", "sz",
            "tq", "tx",
            "uj", "uq", "uu",
            "vb", "vc", "vd", "vf", "vg", "vh", "vj", "vk", "vl", "vm", "vn", "vp", "vq", "vt", "vu", "vv", "vw", "vx", "vz", 
            "wj", "wq", "wv", "wx", "wz", 
            "xb", "xd", "xg", "xj", "xk", "xl", "xn", "xq", "xr", "xv", "xx", "xz", 
            "yq", "yx", "yy", "yz",
            "zb", "zc", "zd", "zf", "zg", "zj", "zk", "zl", "zm", "zn", "zp", "zq", "zr", "zt", "zv", "zw", "zx"
        ];
        let current2LetterCombination;

        for (let x = start; x <= stop; x=x+10) {
            if (x > start) { 
                current2LetterCombination = this.state.placedLetters[x-10].letter + this.state.placedLetters[x].letter 
                console.log(current2LetterCombination.toLowerCase(), invalidLetterCombinations.includes(current2LetterCombination.toLowerCase()))
            };
            if (x > start && invalidLetterCombinations.includes(current2LetterCombination.toLowerCase())) {
                return "" 
            } else {
                myWord = myWord + this.state.placedLetters[x].letter //build string
            }    
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
                                type: "horizontal",
                                row: parseInt(firstLetter / 10)
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
        this.setState({ foundWordID : NaN })
        if (this.state.possibleWords.length > 0) {this.checkIfItIsAWord(0)};
        
        
        
        if (this.state.numLettersPerColumn[this.state.currentColumn] < 21) {
            // pick new "next up" letters, move next up to play now
            this.pickNewLetters();
            // move dropping piece back to top
            this.setState({ pieceSpeed: 0}) //so piece doesn't visually move to top of board
            this.setState({ currentPieceX: 100 }) //set starting X position
            this.setState({ currentColumn: 4 }) //set starting column
            this.setState({ currentPieceY: -75 }) //set starting Y position 
            this.setState({ pieceSpeed: 750}) //reset visual effect for falling piece
        } else {
            //Game over
            console.log("GAME OVER")
            this.setState({
                possibleWords : [],
                isGameOver: true
            })
            //Modal?? - with option to play again??
            //check to see if there is a new highscore
            //check to see if there is a new high word
            
            clearInterval(this.timerID); //Stop falling effect of moving piece
        }

    }

    removeFoundWord = () => {
        let myBoard = [];
        let columns = [];
        

        //get current heights of gameboard columns
        for (let x = 0; x<10; x++) {
            columns[x] = this.state.numLettersPerColumn[x]
        }

        //get current board of letters
        for (let x = 0; x<200; x++) {
            myBoard[x] = this.state.placedLetters[x]
        }


        if (this.state.foundWordType === "horizontal") {
            for (let x = this.state.foundWordStart; x <= this.state.foundWordEnd; x++) {
                for (let y = x; y >= 10; y = y - 10) {
                    myBoard[y].letter = myBoard[y-10].letter;
                    myBoard[y].points = this.letterPoints[myBoard[y].letter];
                }
                columns[x % 10] = columns[x % 10] - 1;
            }
        } else if (this.state.foundWordType === "vertical") {
            let wordLength = (this.state.foundWordEnd - this.state.foundWordStart + 10) / 10;
            let myCol = this.state.foundWordEnd % 10;
            for (let y = 0; y< wordLength; y++) {
                for (let x = this.state.foundWordEnd; x >= 10; x=x-10) {
                    myBoard[x].letter = myBoard[x-10].letter;
                    myBoard[x].points = this.letterPoints[myBoard[x].letter];
                }
            }
            myBoard[myCol].letter = ""
            myBoard[myCol].points = this.letterPoints[myBoard[myCol].letter];
            columns[myCol] = columns[myCol] - wordLength;
        }
        
        this.setState({ numLettersPerColumn : columns})
        // console.log(myBoard)
        this.setState({ placedLetters : myBoard })

    }

    checkIfItIsAWord = (index) => {
        //recursively checks possibleWords array... 
        //if a word is found, updates score & removes letters from board
        if (!this.state.isGameOver) {
            let word = this.state.possibleWords[index].word
            console.log(word, index, this.state.possibleWords.length);
            API.checkWord(word).then(wordData => { 
                if (wordData.data) { //is a word, update state, score and clear letters
                    console.log("found word: " + word)
                    
                    this.setState({ foundWordID : index})
                    this.setState({ foundWord : this.state.possibleWords[index].word})
                    this.setState({ foundWordValue : this.state.possibleWords[index].value})
                    this.setState({ foundWordStart : this.state.possibleWords[index].start})
                    this.setState({ foundWordEnd : this.state.possibleWords[index].end})
                    this.setState({ foundWordType : this.state.possibleWords[index].type})
                    
                    // Update Score
                    this.setState({ score : this.state.score + this.state.foundWordValue})
                    
                    // Remove Letter from Board
                    this.removeFoundWord()

                    console.log(this.state.numLettersPerColumn)
                } else if (index + 1 === this.state.possibleWords.length) { //Not a word, end of array
                    this.setState({ foundWordID : NaN}) 
                    console.log(this.state.numLettersPerColumn)
                } else { //Not a word, go to next possible word in array (index + 1)
                    this.checkIfItIsAWord( index + 1 )
                }
            })
        }
    }
    
    ArrowKeys = (e) => {
        // left arrow move left
        if (e.keyCode === 37) {
        //   console.log("left");
          this.leftClick();
        }
        //right arrow move right
        if (e.keyCode === 39) {
          this.rightClick();
        //   console.log("right");
        }
        //down arrow move down
        if (e.keyCode === 40) {
          this.downClick();
        //   console.log("down");
        }
        //up arrow cycles
        if (e.keyCode === 38) {
          this.cycleClick();
        //   console.log("cycle");
        }
      }
    
    render() {
        return (
            <div className="container mb-5"  onKeyUp={this.ArrowKeys}>

                {this.state.instructions && !this.state.playGame ? 
                <GameInstructions startGame={this.startGame}/>
                :
                <>

                <h1 className="text-center mt-5 mb-4 bring-front">Play</h1>

                <div className="row desk">
                    <div className="col-md-3 text-center">
                        <Next pickNewLetters={this.pickNewLetters} nextUp={this.state.nextUp} />
                        <br></br>
                        <Found foundWord={this.state.foundWord} foundWordValue={this.state.foundWordValue} />
                    </div>
                    <div className="col-md-6 text-center">
                        <GameArea 
                            currentPieceX={this.state.currentPieceX}
                            currentPieceY={this.state.currentPieceY} 
                            pieceSpeed = {this.state.pieceSpeed}
                            pickNewLetters={this.pickNewLetters}          
                            playLetters={this.state.playLetters}    
                            placedLetters={this.state.placedLetters} 
   
                        />
                        
                    </div>
                    <div className="col-md-3">
                        <Scores score={this.state.score} level={this.state.level} />

                        <div className="mt-5">
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
                </div>

                {/* MOBILE LAYOUT */}
                <div className="mobile">

                    <div className="row align-items-center">
                        <div className="col-md-6 no-split text-center">
                            <Next pickNewLetters={this.pickNewLetters} nextUp={this.state.nextUp} />
                        </div>

                        <div className="col-md-6 no-split">
                            <Scores score={this.state.score} level={this.state.level} />
                        </div>
                    </div>

                    <div className="row mt-3 mb-5 bring-front">
                        <div className="col-md-12 text-center">
                            <Found foundWord={this.state.foundWord} foundWordValue={this.state.foundWordValue} />
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <GameArea 
                                currentPieceX={this.state.currentPieceX}
                                currentPieceY={this.state.currentPieceY} 
                                pieceSpeed = {this.state.pieceSpeed}
                                pickNewLetters={this.pickNewLetters}          
                                playLetters={this.state.playLetters}    
                                placedLetters={this.state.placedLetters} 
   
                            />
                        
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-12 text-center">
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
                </div>
                </>
                }
            </div>
    
        );
    }
}

export default Play;
