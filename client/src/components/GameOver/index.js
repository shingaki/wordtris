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

    for (let i = 0; i < 5; i++) {
      playerInfo.topWords.push(this.props.myTopWords[i]);
    }

    console.log(playerInfo);

    // ============================================================================
    // pull in global high scores
    API.getGlobalHighScores().then(response => {
      const highScores = [];

      for (let i = 0; i < response.data.length; i++) {
        highScores.push({
          playerId: response.data[i].playerId,
          score: response.data[i].highestScore
        });
      }
      console.log(highScores);
      this.setState({
        globalHighScores: highScores
      })

      // compare each score against current player's new score
      for (let i = 0; i < this.state.globalHighScores.length; i++) {
        // if the new score is higher than one in the top 5
        if (playerInfo.score > this.state.globalHighScores[i].score) {

          // reset score - adjust all below it
          var newScores = this.state.globalHighScores;
          console.log(newScores);

          // add in new player score in correct position
          newScores.splice(i, 0, playerInfo);

          // remove the lowest score so there are only top 5
          newScores.pop();

          // update state
          this.setState({
            globalHighScores: newScores
          })

          // update high scores in DB
          API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
            console.log(res);
          });

          console.log(newScores);
          return true;
        }
      }


    })

    // ============================================================================
    API.getGlobalHighWords().then(response => {
      console.log(response.data);
      let topWords = [];
      for (let i = 0; i < response.data.length; i++) {
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
      // loop through global high scores - make sure any scores from player with same word aren't copied
      // if they are copied, remove them from array

      // loop through global top words
      for (let i = 0; i < globalTopWords.length; i++) {
        // compare each global word with each player word
        for (let j = 0; j < playerInfo.topWords.length; j++) {
          // if word, word score, and playerId are the same, remove for list of potential new global high scores
          if (playerInfo.topWords[j].wordPoints === globalTopWords[i].score && playerInfo.topWords[j].playerWord === globalTopWords[i].word && playerInfo.playerId === globalTopWords[i].playerId) {
            playerInfo.topWords.splice(j, 1);
            console.log("duplicate removed");
          }
        }
      }

      // see if any of player's top words make the top 5 global words
      let topWordsThisRound = this.props.myTopWords;

      // for each player's top words of this game
      for (let i = 0; i < playerInfo.topWords.length; i++) {
        // compare word score against each global word's score
        for (let j = 0; j < this.state.globalTopWords.length; j++) {
          // if the new word's score is higher than one in the top 5
          console.log("before score comparision")
          if (playerInfo.topWords[i].wordPoints > this.state.globalTopWords[j].score) {
            // adjust order to add in new word
            // var newWords = this.state.globalTopWords;

            var wordToAdd = {
              playerId: playerInfo.topWords[i].PlayerId,
              word: playerInfo.topWords[i].playerWord,
              score: playerInfo.topWords[i].wordPoints
            }

            // add in new player score in correct position
            globalTopWords.splice(j, 0, wordToAdd);
            // remove the lowest score so there are only top 5
            globalTopWords.pop();
            // update state
            this.setState({
              globalTopWords: globalTopWords
            })

            // update high scores in DB
            API.updateGlobalBestWords(this.state.globalTopWords).then(res => {
              console.log(res);
            });

            console.log(globalTopWords);
            return true;
          }
        }

      }

    })

    // ============================================================================
    // update player words in db
    API.updatePlayersBestWords(this.props.myTopWords).then(response => {
      console.log("updating player's top words")
    })


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
