import React, { Component } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import API from "../../utils/API";

class GameOver extends Component {
  state = {
    globalHighScores: [],
    globalTopWords: []
  }

  componentWillMount = () => {

    // save current player's data
    let playerInfo = {
      playerId: this.props.userID,
      score: this.props.score,
      topWords: []
    }

    for (let i = 0; i < this.props.myTopWords.length; i++) {
      playerInfo.topWords.push(this.props.myTopWords[i]);
    }

    console.log(playerInfo);

    // ============================================================================
    // pull in and update global high scores
    API.getGlobalHighScores().then(response => {
      // original scores pulled in for reference
      let originalHighScores = [];
      // var to update before state
      let highScores = [];
      // know if the score has been added to top scores
      let scoreAdded = false;

      for (let i = 0; i < response.data.length; i++) {
        originalHighScores.push({
          playerId: response.data[i].playerId,
          score: response.data[i].highestScore
        });

        highScores.push({
          playerId: response.data[i].playerId,
          score: response.data[i].highestScore
        });
      }
      console.log(highScores);
      this.setState({
        globalHighScores: highScores
      })

      if (!scoreAdded) {
        // compare each score against current player's new score
        for (let i = 0; i < this.state.globalHighScores.length; i++) {
          // if the new score is higher than one in the top 5
          if (playerInfo.score > this.state.globalHighScores[i].score) {

            let newScore = {
              playerId: playerInfo.playerId,
              score: playerInfo.score,
            }

            // add in new player score in correct position
            highScores.splice(i, 0, newScore);
            // score has been added
            scoreAdded = true;

            // if there were already 5 scores, remove lowest score
            if (originalHighScores.length === 5) {
              console.log("remove global lowest score");
              highScores.pop();
            }

            // update state
            this.setState({
              globalHighScores: highScores
            })

            // update high scores in DB
            API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
              console.log(res);
            });

            console.log(highScores);
            return true;
          }
        }

        // if no high scores, or less than 5 high scores and score wasn't updated in previous loop
        if (this.state.globalHighScores.length === 0 || (this.state.globalHighScores.length < 5 && !scoreAdded)) {
          console.log("no global high scores yet");
          let newScore = {
            playerId: playerInfo.playerId,
            score: playerInfo.score,
          }

          // add new score to bottom of top 5
          highScores.push(newScore);

          // update state
          this.setState({
            globalHighScores: highScores
          })

          // update high scores in db
          API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
            console.log(res);
          })
        }
      }

    })

    // ============================================================================
    // pull in and update global high words
    API.getGlobalHighWords().then(response => {
      console.log(response.data);
      // original words from db
      let originalTopWords = [];
      // var to update top words with
      let topWords = [];
      for (let i = 0; i < response.data.length; i++) {
        originalTopWords.push({
          playerId: response.data[i].playerId,
          word: response.data[i].highestWord,
          score: response.data[i].score
        });
        
        topWords.push({
          playerId: response.data[i].playerId,
          word: response.data[i].highestWord,
          score: response.data[i].score
        });
      }
      console.log(topWords);
      this.setState({
        globalTopWords: topWords
      })

      let globalTopWords = [];
      for (let i = 0; i < this.state.globalTopWords.length; i++) {
        globalTopWords.push(this.state.globalTopWords[i]);
      }

      // loop through global top words - make sure any words from same player with same score are removed
      for (let i = 0; i < globalTopWords.length; i++) {
        // compare each global word with each player word
        for (let j = 0; j < playerInfo.topWords.length; j++) {
          // if word, word score, and playerId are the same, remove from list of potential new global high scores
          console.log(playerInfo);
          if (playerInfo.topWords[j].wordPoints === globalTopWords[i].score && playerInfo.topWords[j].playerWord === globalTopWords[i].word && playerInfo.playerId === globalTopWords[i].playerId) {
            // if there's a duplicate, remove it from array
            console.log(playerInfo.topWords[j]);
            playerInfo.topWords.splice(j, 1);
            console.log("duplicate removed");
          }
        }
      }

      // see if any of player's top words make the top 5 global words
      console.log(originalTopWords);
      console.log(originalTopWords.length);
      // for each player's top words of this game
      for (let i = 0; i < playerInfo.topWords.length; i++) {
        let wordAdded = false;
        console.log("checking word " + i)
        // compare word's score against each global word's score
        for (let j = 0; j < this.state.globalTopWords.length; j++) {
          if (!wordAdded) {
            // if the new word's score is higher than one in the top 5
            if (playerInfo.topWords[i].wordPoints > this.state.globalTopWords[j].score) {
              console.log("word is above current top word")

              var wordToAdd = {
                playerId: playerInfo.topWords[i].PlayerId,
                word: playerInfo.topWords[i].playerWord,
                score: playerInfo.topWords[i].wordPoints
              }

              // add in new player score in correct position
              globalTopWords.splice(j, 0, wordToAdd);
              wordAdded = true;

              // if already 5 top words, remove the lowest score
              if (originalTopWords.length === 5) {
                globalTopWords.pop();
                console.log("added global word and popped lowest score")
              }
              // update state
              this.setState({
                globalTopWords: globalTopWords
              })

              // update high scores in DB
              API.updateGlobalBestWords(this.state.globalTopWords).then(res => {
                console.log(res);
              });

              console.log(globalTopWords);
            }
          }
          
        }

        // if no global best words yet, or less than 5 global best words and word wasn't added in loop above
        if (originalTopWords.length === 0 || originalTopWords.length < 5 && !wordAdded) {
          console.log("less than 5 top words and word not added yet");
          var wordToAdd = {
            playerId: playerInfo.topWords[i].PlayerId,
            word: playerInfo.topWords[i].playerWord,
            score: playerInfo.topWords[i].wordPoints
          }

          // add new word to bottom of top 5
          globalTopWords.push(wordToAdd);

          // update state
          this.setState({
            globalTopWords: globalTopWords
          })

          console.log(globalTopWords)

          // update high scores in DB
          API.updateGlobalBestWords(this.state.globalTopWords).then(res => {
            console.log(res);
          });

        }

        console.log(this.state.globalTopWords);

      }

    })

    // ============================================================================
    // update player words in db
    API.updatePlayersBestWords(this.props.myTopWords).then(response => {
      console.log("updating player's top words")
    })

    // ============================================================================
    // pull in and update player scores
    let playerScores = [];
    let scoreAdded = false;
    for (let i = 0; i < this.props.myHighScores.length; i++) {
      playerScores.push(this.props.myHighScores[i]);
    }
    console.log("B4 player scores");
    console.log(playerScores);

    if (!scoreAdded) {
      // compare each top score against the new score
      for (let i = 0; i < this.props.myHighScores.length; i++) {
        console.log("loop here to check player high scores")
        // if the new score is higher than one in the top 5
        if (playerInfo.score > this.props.myHighScores[i].playerScore) {

          let newScore = {
            PlayerId: playerInfo.playerId,
            playerScore: playerInfo.score,
            playerScoreRanking: i + 1
          }

          // add in new player score in correct position
          playerScores.splice(i, 0, newScore);
          scoreAdded = true;

          // if already 5 scores, remove the lowest score
          if (this.props.myHighScores.length === 5) {
            console.log("remove lowest score");
            playerScores.pop();
          }

          console.log("NEW PLAYER HIGH SCORES");
          console.log(playerScores);
          // update high scores in DB
          API.updatePlayersHighestScores(playerScores).then(res => {
            console.log(res);
          });

          console.log(playerScores);
          return true;
        }

        }

        // if no high scores saved yet
        if (this.props.myHighScores.length === 0) {
          console.log("no high scores yet");
          let newScore = {
            PlayerId: playerInfo.playerId,
            playerScore: playerInfo.score,
            playerScoreRanking: 1
          }
          // add new score
          playerScores.push(newScore);

          // update high scores in DB
          API.updatePlayersHighestScores(playerScores).then(res => {
            console.log(res);
          });
        } else if (this.props.myHighScores.length < 5 && playerScores.length < 5 && !scoreAdded) {
          // if less than 5 words saved and score wasn't updated in loop above
          console.log("no score added yet, 1-4 scores already")
          let newScore = {
            PlayerId: playerInfo.playerId,
            playerScore: playerInfo.score,
            playerScoreRanking: playerScores.length + 1
          }
          // add new score
          playerScores.push(newScore);
          console.log(playerScores);

          // update high scores in DB
          API.updatePlayersHighestScores(playerScores).then(res => {
            console.log(res);
          });
      }
    }


  }

  render() {
    return (
      <>
        <div className="row text-center mt-5">
          <div className="col-md-12">
            <h1>GAME OVER!</h1>
            <h4>Your Score: {this.props.score}</h4>
            <h4>Your Level: {this.props.level}</h4>

            <h3 className="mb-4">Play Again?</h3>

            <button
              onClick={this.props.GameNotOver}
              className="btn btn-primary btn-lg"
            >
              PLAY AGAIN &#8680;
            </button>

            <Link to="/scores">
              <button className="btn btn-primary btn-lg">
                HIGH SCORES &#8680;
              </button>
            </Link>

          </div>
        </div>
      </>
    );
  }
}

export default GameOver;
