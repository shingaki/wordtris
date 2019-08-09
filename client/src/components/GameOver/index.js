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

    // pull in global high scores
    API.getGlobalHighScores().then(response => {
      const highScores = [];
      console.log(highScores);

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

      // save current player's data
      let playerInfo = {
        playerId: this.props.userID,
        score: this.props.score
      }

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

    API.getGlobalHighWords().then(response => {
      // console.log(response.data);
      let topWords = [];
      // for (let i = 0; i < response.data.length; i++) {
      //   topWords.push(response.data[i].highestScore);
      // }
      // console.log(topWords);
      // this.setState({
      //   globalTopWords: topWords
      // })
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
