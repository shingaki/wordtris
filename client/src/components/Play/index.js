import React, { Component } from "react";
import "./style.css";
import Next from "../Next";
import Found from "../Found";
import GameArea from "../GameArea";
import Scores from "../Scores";
import Controls from "../Controls";
import API from "../../utils/API";
import GameInstructions from "../GameInstructions";
import GameOver from "../GameOver";

class Play extends Component {

    state = {
        instructions: true,
        playGame: false,
        score: 0,
        level: 1,
        previousLevelTargetScore: 0,
        currentLevelTargetScore: 50,
        fallSpeed: 150,
        currentPieceX: 100,
        currentColumn: 4,
        numLettersPerColumn: [0,0,0,0,0,0,0,0,0,0],
        currentPieceY: -75,
        pieceSpeed: 0,
        nextUp: [],
        playLetters: [],
        placedLetters: [],
        newPlacedLetters: [],
        possibleWords: [],
        allFoundWords: [],
        foundWord: "",
        foundWordValue: 0,
        foundWordStart: NaN,
        foundWordEnd: NaN,
        foundWordType: "",
        isGameOver: false,
        numPiecesPlayed: 0,
        lastPieceThatFoundWord: 0
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
                points: this.letterPoints[""],
                bonus: 1,
                bgColor: "",
                textColor: ""
            })
        }

        //set intial state of game board
        this.setState({placedLetters : emptyBoard})
    }

    pickNewLetters = () => {
        var nextList = [];
        // generate three letters
        for (var i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * this.weightedLetters.length);
            let randomLetter = this.weightedLetters[random];
            // save each letter and its score
            nextList.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter],
                bonus: 1,
                bgColor: "",
                textColor: ""
            })
        }
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
        this.setState({ 
            newPlacedLetters : myPlacedLetters,
            numLettersPerColumn : columns,
            placedLetters : myBoard,
            numPiecesPlayed : this.state.numPiecesPlayed + 1,
            foundWord : "",
            foundWordValue : 0,
            foundWordStart : NaN,
            foundWordEnd : NaN,
            foundWordType : ""
        })
     
    }

    componentDidMount = () => {
        // initial setup
        this.initialSetup();
    }


    startClick = () => {
        var nextList = [];
        var playNow = [];
        // generate next up three letters
        for (var i = 0; i < 3; i++) {
            // let random = Math.floor(Math.random() * this.letters.length);
            let random = Math.floor(Math.random() * this.weightedLetters.length);
            let randomLetter = this.weightedLetters[random];
            // save each letter and its score
            nextList.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter],
                bonus: 1,
                bgColor: "",
                textColor: ""
            })
        }

        // generate play now three letters
        for (var i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * this.weightedLetters.length);
            let randomLetter = this.weightedLetters[random];
            // save each letter and its score
            playNow.push({
                letter: randomLetter,
                points: this.letterPoints[randomLetter],
                bonus: 1,
                bgColor: "",
                textColor: ""
            })
        }
        // move next up letters to play letters
        // save new next up letters
        this.setState({
            playLetters: playNow,
            nextUp: nextList,
        })
        
        //begins falling of first piece
        this.startTick();
    }

    stopClick = () => {
        //stops current piece from falling (only used during dev)
        clearInterval(this.timerID);
    }

    increaseClick = () => {
        //increases fallSpeed
        this.setState({ fallSpeed: this.state.fallSpeed / 2 })
        clearInterval(this.timerID);
        this.startTick();
    }

    downClick = () => {
        //moves current piece down the 1 letter block in distance
        if (this.state.currentPieceY > -75 && this.state.currentPieceY < 425 - 25 * this.state.numLettersPerColumn[this.state.currentColumn]) {
            this.setState({ currentPieceY: this.state.currentPieceY + 25 })
        }
    }

    leftClick = () => {
        //moves current piece left one column, checks to make sure current piece is clear of already placed letters and isn't at edge of gameboard
        if (this.state.currentPieceY > -75 && this.state.currentPieceX > 0 && this.state.currentPieceY < 430 - 25 * this.state.numLettersPerColumn[this.state.currentColumn - 1]) {
            this.setState({ currentPieceX: this.state.currentPieceX - 25 })
            this.setState({ currentColumn: this.state.currentColumn - 1 })
        }
    }

    rightClick = () => {
        //moves current piece right one column, checks to make sure current piece is clear of already placed letters and isn't at edge of gameboard
        if (this.state.currentPieceY > -75 && this.state.currentPieceX < 225 && this.state.currentPieceY < 430 - 25 * this.state.numLettersPerColumn[this.state.currentColumn + 1]) {
            this.setState({ currentPieceX: this.state.currentPieceX + 25 })
            this.setState({ currentColumn: this.state.currentColumn + 1 })
        }
    }

    cycleClick = () => {
        //cycles the letters of the current piece
        var cycleLetters = [];

        if (this.state.currentPieceY > -75) {
            cycleLetters[0] = this.state.playLetters[2]
            cycleLetters[1] = this.state.playLetters[0]
            cycleLetters[2] = this.state.playLetters[1]
            this.setState({
                playLetters: cycleLetters
            })
        }
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

    wordValue = (start, end, type) => {
        let myValue = 0;
        // let myBoard = [];
        let delta = 0;

        if (type === "horizontal") {
            delta = 1
        } else if (type === "vertical") {
            delta = 10
        }

        // //get current board of letters
        // for (let x = 0; x<200; x++) {
        //     myBoard[x] = this.state.placedLetters[x]
        // } 

        for (let y = start; y <= end; y=y+delta) {
            myValue = myValue + this.state.placedLetters[y].points * this.state.placedLetters[y].bonus
        }
        return myValue
    }

    containsVowels = (word) => {
        let vowels = ['A', 'E', 'I', 'O', 'U', 'Y']
        
        for (let x = 0; x < word.length; x++) {
           if (vowels.includes(word[x])) {return true}
        }
        return false
    }

    buildHorizontalWordFromBoard = (start, stop, check2letters) => {
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
                };
                if (this.state.placedLetters[x].letter === "") { 
                    //if there is a blank space between start and stop, return empty string, 
                    //this tells the function that called it that there wasn't a valid word between start and stop
                    return "" 
                } else if (x > start && check2letters && invalidLetterCombinations.includes(current2LetterCombination.toLowerCase())) {
                    return "" 
                } else {
                    myWord = myWord + this.state.placedLetters[x].letter //build string
                }
            }
            return myWord;
        }
        return myWord
    }

    buildVerticalWordFromBoard = (start, stop, check2letters) => {
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
            };
            if (x > start && check2letters && invalidLetterCombinations.includes(current2LetterCombination.toLowerCase())) {
                return ""
            } else {
                myWord = myWord + this.state.placedLetters[x].letter //build string
            }    
        }
        return myWord;
    }

    buildPossibleWordsArray = () => {
        let myPossibleWords = [];
        let currentWord = "";
        let currentLetter;
        let minLetter; 
        let maxLetter; 

        for (let x = 0; x < this.state.newPlacedLetters.length; x++) { //loops 3 times, once for each new placed letter
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
                        currentWord = this.buildHorizontalWordFromBoard(firstLetter, lastLetter, true); //convert letters on board into string
                        if (currentWord !== "" && this.containsVowels(currentWord) && currentWord.length > 2) { 
                            myPossibleWords.push({ //push string and other values to array
                                value: this.wordValue(firstLetter, lastLetter, "horizontal"),
                                word: currentWord,
                                start: firstLetter,
                                end: lastLetter,
                                type: "horizontal",
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
                        currentWord = this.buildVerticalWordFromBoard(firstLetter, lastLetter, true);
                        if (currentWord !== "" && this.containsVowels(currentWord) && currentWord.length > 2) { 
                            myPossibleWords.push({ //push string and other values to array
                                value: this.wordValue(firstLetter, lastLetter, "vertical"),
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

    startNextRound = () => {
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
            this.setState({
                possibleWords : [],
                isGameOver: true
            })
           
            clearInterval(this.timerID); //Stop falling effect of moving piece
        }
    }

    startTick = () => {
        
        
        if (this.state.score >= this.state.currentLevelTargetScore) {
            let newTarget = this.state.currentLevelTargetScore + this.state.previousLevelTargetScore + this.state.currentLevelTargetScore;
            let newFallspeed = this.state.fallSpeed;

            if (newFallspeed > 25) {newFallspeed = newFallspeed - 25} 
            else {newFallspeed = newFallspeed / 2}
            
            console.log("New Target: " + newTarget)
            console.log("New Fall Speed: " + newFallspeed)
            this.setState({
                level: this.state.level + 1,
                previousLevelTargetScore: this.state.currentLevelTargetScore,
                currentLevelTargetScore: newTarget,
                fallSpeed: newFallspeed
            })
        }
        
        this.timerID = setInterval(
            () => this.tick(),
            this.state.fallSpeed
        );
    }

    containsSingleLetter = (word) => {
        let letter = word.charAt(0)
        
        for (let x = 1; x < word.length; x++) {
           if (letter !== word.charAt(x)) {return false}
        }
        return true
    }

    checkForLetterBonuses = () => {
        let currentWord = "";
        let currentLetter;
        let minLetter; 
        let maxLetter;                             
        this.setState({ 
            foundWord : "",
            foundWordValue : 0,
            foundWordStart : NaN,
            foundWordEnd : NaN,
            foundWordType : ""
        })


        for (let x = 0; x < this.state.newPlacedLetters.length; x++) { //loops 3 times, once for each new placed letter
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
                        currentWord = this.buildHorizontalWordFromBoard(firstLetter, lastLetter, false); //convert letters on board into string
                        if (currentWord !== "" && this.containsSingleLetter(currentWord) && currentWord.length > this.state.foundWord.length) { 
                            this.setState({ 
                                foundWord : currentWord,
                                foundWordValue : 0,
                                foundWordStart : firstLetter,
                                foundWordEnd : lastLetter,
                                foundWordType : "horizontal"
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
                        currentWord = this.buildVerticalWordFromBoard(firstLetter, lastLetter, false);
                        if (currentWord !== "" && this.containsSingleLetter(currentWord) && currentWord.length > this.state.foundWord.length) { 
                            this.setState({ 
                                foundWord : currentWord,
                                foundWordValue : 0,
                                foundWordStart : firstLetter,
                                foundWordEnd : lastLetter,
                                foundWordType : "vertical"
                            })
                        }
                    }
                }
            }
        }

        if (this.state.foundWord.length > 0) {
            let myLetter = this.state.foundWord.charAt(0)
            let myBonus = this.state.foundWord.length - 1
            this.updateLetterBonuses(myLetter, myBonus)

            this.removeFoundWord(false)
            //update bonus of all remaing letters
        }
    }

    updateLetterBonuses = (letter, bonus) => {
        let myBoard = [];

        for (let x = 0; x<200; x++) {
            myBoard[x] = this.state.placedLetters[x]
        } 

        for (let y = 0; y < 200; y++) {
            if (myBoard[y].letter === letter) {myBoard[y].bonus = bonus}
        }

        this.setState({ placedLetters : myBoard })
        // console.log(this.state.placedLetters)
    }

    endOfRound = () => {
        
        // save dropping piece at its ending position as new pieces
        this.placeLetters();
        clearInterval(this.timerID);

        // check for letter bonuses
        this.checkForLetterBonuses();
        //build array of possible words should be ordered in decreasing point value
        this.buildPossibleWordsArray();
        //go through array of posisble words to check if there is a word

        if (this.state.possibleWords.length > 0) {
            this.checkIfItIsAWord(0)
        } else {
            this.startTick();
        };
        this.startNextRound();
    
    }

    removeFoundWord = (actualWords) => {
        let myBoard = [];
        let columns = [];
        let myPlacedLetters = [];

        

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
                    myBoard[y].bonus = myBoard[y-10].bonus
                    if (myBoard[y].letter !== "") {myPlacedLetters.push(y)}
                }
                columns[x % 10] = columns[x % 10] - 1;
            }
            for (let x = 1; x < this.state.newPlacedLetters.length; x++) {
                if (!myPlacedLetters.includes(this.state.newPlacedLetters[x])) {
                    myPlacedLetters.push(this.state.newPlacedLetters[x])
                }
            }

            // change tile color back to default
            let currentBoard = [];
            for (let x = 0; x < 200; x++) {
                currentBoard[x] = this.state.placedLetters[x];
            } 
            for (let i = this.state.foundWordStart; i <= this.state.foundWordEnd; i++) {
                // let letterDiv = document.querySelector('[data-id="' + i + '"]');
                // letterDiv.style.backgroundColor = "rgb(216, 203, 187)";
                // letterDiv.style.color = "#212529";
                // let currentBoard = this.state.placedLetters;
                let updatedLetter = this.state.placedLetters[i];
                updatedLetter.bgColor = "";
                updatedLetter.textColor = "";
                currentBoard[i] = updatedLetter;

                // this.setState({
                //     placedLetters: currentBoard
                // })
            }
            this.setState({
                placedLetters: currentBoard
            })

        } else if (this.state.foundWordType === "vertical") {
            let wordLength = (this.state.foundWordEnd - this.state.foundWordStart + 10) / 10; 
            let myCol = this.state.foundWordEnd % 10;
            for (let y = 0; y< wordLength; y++) {
                for (let x = this.state.foundWordEnd; x >= 10; x=x-10) {
                    myBoard[x].letter = myBoard[x-10].letter;
                    myBoard[x].points = this.letterPoints[myBoard[x].letter];
                    myBoard[x].bonus = myBoard[x-10].bonus
                    if (y+1 === wordLength && myBoard[x].letter !== "") {myPlacedLetters.push(x)}
                }
            }
            myBoard[myCol].letter = "";
            myBoard[myCol].points = this.letterPoints[myBoard[myCol].letter];
            myBoard[myCol].bonus = 1;
            columns[myCol] = columns[myCol] - wordLength;

            // change tile color back to default
            let currentBoard = [];
            for (let x = 0; x < 200; x++) {
                currentBoard[x] = this.state.placedLetters[x];
            } 
            console.log(currentBoard);
            for (let i = this.state.foundWordStart; i <= this.state.foundWordEnd; i = i + 10) {
                // let letterDiv = document.querySelector('[data-id="' + i + '"]');
                // letterDiv.style.backgroundColor = "rgb(216, 203, 187)";
                // letterDiv.style.color = "#212529";
                // let currentBoard = this.state.placedLetters;
                let updatedLetter = this.state.placedLetters[i];
                updatedLetter.bgColor = "";
                updatedLetter.textColor = "";
                currentBoard[i] = updatedLetter;

                // this.setState({
                //     placedLetters: currentBoard
                // })
            }
            this.setState({
                placedLetters: currentBoard
            })
        }
        
        this.setState({ numLettersPerColumn : columns})
        this.setState({ placedLetters : myBoard })
        console.log("before update: " + this.state.newPlacedLetters)
        myPlacedLetters.sort();
        this.setState({ newPlacedLetters : myPlacedLetters})
        console.log("after update: " + this.state.newPlacedLetters)
        if (actualWords) {
            if (myPlacedLetters.length === 0) {
                this.startTick();
            } else {
                this.checkForLetterBonuses();
                this.buildPossibleWordsArray();
                //go through array of posisble words to check if there is a word

                if (this.state.possibleWords.length > 0) {
                    this.checkIfItIsAWord(0)
                } else {
                    this.startTick();
                };
            }
        }
        

    }

    checkIfItIsAWord = (index) => {
        //recursively checks possibleWords array... 
        //if a word is found, updates score & removes letters from board
        if (!this.state.isGameOver) {
            let word = this.state.possibleWords[index].word
            API.checkWord(word).then(wordData => { 
                if (wordData.data) { //is a word, update state, score and clear letters
                    console.log("found word: " + word)
                    if (this.state.numPiecesPlayed !== this.state.lastPieceThatFoundWord) {
                        this.setState({ 
                            allFoundWords : [],
                            lastPieceThatFoundWord : this.state.numPiecesPlayed
                        })
                    }
                    let myWords = [];
                    let currentWord = {}
                    for (let x = 0; x< this.state.allFoundWords.length; x++) {
                        myWords[x] = this.state.allFoundWords[x];
                    }
                    
                    currentWord.word = this.state.possibleWords[index].word;
                    currentWord.value = this.state.possibleWords[index].value * (this.state.allFoundWords.length + 1);
                    // need to update bonuses to say Double word and or double letters used
                    currentWord.wordBonus = this.state.allFoundWords.length + 1;
                    currentWord.letterBonuses = "NONE FOR NOW";

                    myWords.push(currentWord);

                    this.setState({ 
                        foundWord : this.state.possibleWords[index].word,
                        foundWordValue : this.state.possibleWords[index].value,
                        allFoundWords : myWords,
                        foundWordStart : this.state.possibleWords[index].start,
                        foundWordEnd : this.state.possibleWords[index].end,
                        foundWordType : this.state.possibleWords[index].type
                    })
                    
                    // Update Score
                    this.setState({ score : this.state.score + this.state.foundWordValue * this.state.allFoundWords.length})
                    
                    // highlight found word
                    console.log("highlight the word")
                    if (this.state.foundWordType === "horizontal") {
                        console.log("horizontal");
                        let currentBoard = [];
                        for (let x = 0; x < 200; x++) {
                            currentBoard[x] = this.state.placedLetters[x];
                        }
                        console.log(currentBoard);
                        for (let i = this.state.foundWordStart; i <= this.state.foundWordEnd; i++) {
                            // let letterDiv = document.querySelector('[data-id="' + i + '"]');
                            // letterDiv.style.backgroundColor = "#560764";
                            // letterDiv.style.color = "#fff";
                            // let currentBoard = this.state.placedLetters;
                            let updatedLetter = this.state.placedLetters[i];
                            console.log(updatedLetter);
                            updatedLetter.bgColor = "#560764";
                            updatedLetter.textColor = "#fff";
                            console.log(updatedLetter);
                            currentBoard[i] = updatedLetter;

                            // this.setState({
                            //     placedLetters: currentBoard
                            // })
                            // console.log(this.state.placedLetters)
                        }

                        this.setState({
                            placedLetters: currentBoard
                        })

                    } else if (this.state.foundWordType === "vertical") {
                        console.log("vertical");
                        let currentBoard = [];
                        for (let x = 0; x < 200; x++) {
                            currentBoard[x] = this.state.placedLetters[x];
                        }
                        for (let i = this.state.foundWordStart; i <= this.state.foundWordEnd; i = i + 10) {
                            // let letterDiv = document.querySelector('[data-id="' + i + '"]');
                            // letterDiv.style.backgroundColor = "#560764";
                            // letterDiv.style.color = "#fff";
                            // let currentBoard = this.state.placedLetters;
                            // let updatedLetter = this.state.placedLetters[i];
                            // console.log(updatedLetter);
                            currentBoard[i].bgColor = "#560764";
                            currentBoard[i].textColor = "#fff";
                            // console.log(updatedLetter);
                            // currentBoard[i] = updatedLetter;

                            // this.setState({
                            //     placedLetters: currentBoard
                            // })
                            // console.log(this.state.placedLetters)
                        }
                        this.setState({
                            placedLetters: currentBoard
                        })
                    }

                    // Remove Letter from Board
                    setTimeout(() => {
                        this.removeFoundWord(true)
                    }, 1500)
                    
                } else if (index + 1 === this.state.possibleWords.length) { //Not a word, end of array
                    this.startTick();
                } else { //Not a word, go to next possible word in array (index + 1)
                    this.checkIfItIsAWord( index + 1 )
                }
            })
        }
    }
    
    ArrowKeys = (e) => {
        // left arrow move left
        if (e.keyCode === 37) {
          this.leftClick();
        }
        //right arrow move right
        if (e.keyCode === 39) {
          this.rightClick();
        }
        //down arrow move down
        if (e.keyCode === 40) {
            // prevent default, return false to stop scroll
            e.preventDefault()
            this.downClick();
            // return false;
        }
        //up arrow cycles
        if (e.keyCode === 38) {
            // prevent default, return false to stop scroll
            e.preventDefault();
            this.cycleClick();
            // return false;
        }
    }

    GameNotOver =()=>{
        this.setState({playGame: false});
        this.setState({score: 0});
        this.setState({level: 1});
        this.setState({fallSpeed: 150});
        this.setState({currentPieceX: 100});
        this.setState({currentColumn: 4});
        this.setState({numLettersPerColumn: [0,0,0,0,0,0,0,0,0,0]});
        this.setState({currentPieceY: -75});
        this.setState({pieceSpeed: 0});
        this.setState({nextUp: []});
        this.setState({playLetters: []});
        this.setState({placedLetters: []});
        this.setState({newPlacedLetters: []});
        this.setState({possibleWords: []});
        this.setState({foundWord: ""});
        this.setState({foundWordValue: 0});
        this.setState({foundWordStart: NaN});
        this.setState({foundWordEnd: NaN});
        this.setState({foundWordType: ""});
        this.setState({
            isGameOver: false,
            allFoundWords: []
        });
        this.initialSetup();
    }
    
    render() {
        return (
            <div className="container" tabIndex="0" onKeyDown={this.ArrowKeys}>

                {this.state.isGameOver ? 
                <GameOver  
                score={this.state.score} 
                level={this.state.level}
                GameNotOver ={this.GameNotOver}
                /> 
                :  <>
            

                {this.state.instructions && !this.state.playGame ? 
                <GameInstructions startGame={this.startGame}/>
                :
                <>

                <h1 className="text-center mt-5 mb-4 bring-front">Play</h1>


                <div className="row desk">
                    <div className="col-md-3 text-center">
                        <Next pickNewLetters={this.pickNewLetters} nextUp={this.state.nextUp} />
                        <br></br>
                        <Found 
                            foundWord={this.state.foundWord} 
                            foundWordValue={this.state.foundWordValue}
                            allFoundWords={this.state.allFoundWords}
                        />
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
                            <button onClick={this.stopClick}>STOP</button>
                            <Controls 
                                startClick={this.startClick} 
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
                            <Found 
                                foundWord={this.state.foundWord} 
                                foundWordValue={this.state.foundWordValue}
                                allFoundWords={this.state.allFoundWords}
                            />
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
                </>}
            </div>
    
        );
    }
}

export default Play;
