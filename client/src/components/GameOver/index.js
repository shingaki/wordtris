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


    API.getGlobalHighScores().then(response => {
      console.log(response.data);
      let highScores = [];
      for (let i = 0; i < response.data.length; i++) {
        highScores.push({
          playerId: response.data[i].playerId,
          score: response.data[i].highestScore});
      }
      console.log(highScores);
      this.setState({
        globalHighScores: highScores
      })

      // if all 5 spaces are taken currently
      if (this.state.globalHighScores.length === 5) {
        for (let i = 0; i < this.state.globalHighScores.length; i++) {
          let playerScore = 18;
          // let playerId = this.props.playerId;
          // let playerInfo = {
          //   playerId: this.props.playerId,
          //   score: this.props.score
          // }
          let playerInfo = {
            playerId: 1,
            score: this.props.score
          }
          if (playerInfo.score > this.state.globalHighScores[i].score) {
            // reset score - adjust all below it
            // replace current i's score
            // move current i's value to i + 1 and so on

            // puts player score in front of
            // let newScores = [playerScore, this.state.globalHighScores[i].score];

            if (i === 0) {
              var newScores = [
                playerInfo,
                { playerId: this.state.globalHighScores[i].playerId, score: this.state.globalHighScores[i].score },
                { playerId: this.state.globalHighScores[i + 1].playerId, score: this.state.globalHighScores[i + 1].score },
                { playerId: this.state.globalHighScores[i + 2].playerId, score: this.state.globalHighScores[i + 2].score },
                { playerId: this.state.globalHighScores[i + 3].playerId, score: this.state.globalHighScores[i + 3].score }
              ];
            } else if (i === 1) {
              var newScores = [
                { playerId: this.state.globalHighScores[0].playerId, score: this.state.globalHighScores[0].score },
                playerInfo,
                { playerId: this.state.globalHighScores[1].playerId, score: this.state.globalHighScores[1].score },
                { playerId: this.state.globalHighScores[2].playerId, score: this.state.globalHighScores[2].score },
                { playerId: this.state.globalHighScores[3].playerId, score: this.state.globalHighScores[3].score }
              ];
            } else if (i === 2) {
              var newScores = [
                { playerId: this.state.globalHighScores[0].playerId, score: this.state.globalHighScores[0].score },
                { playerId: this.state.globalHighScores[1].playerId, score: this.state.globalHighScores[1].score },
                playerInfo,
                { playerId: this.state.globalHighScores[2].playerId, score: this.state.globalHighScores[2].score },
                { playerId: this.state.globalHighScores[3].playerId, score: this.state.globalHighScores[3].score }
              ];
            } else if (i === 3) {
              var newScores = [
                { playerId: this.state.globalHighScores[0].playerId, score: this.state.globalHighScores[0].score },
                { playerId: this.state.globalHighScores[1].playerId, score: this.state.globalHighScores[1].score },
                { playerId: this.state.globalHighScores[2].playerId, score: this.state.globalHighScores[2].score },
                playerInfo,
                { playerId: this.state.globalHighScores[3].playerId, score: this.state.globalHighScores[3].score }
              ];
            } else if (i === 4) {
              var newScores = [
                { playerId: this.state.globalHighScores[0].playerId, score: this.state.globalHighScores[0].score },
                { playerId: this.state.globalHighScores[1].playerId, score: this.state.globalHighScores[1].score },
                { playerId: this.state.globalHighScores[2].playerId, score: this.state.globalHighScores[2].score },
                { playerId: this.state.globalHighScores[3].playerId, score: this.state.globalHighScores[3].score },
                playerInfo
              ];
            }

            this.setState({
              globalHighScores: newScores
            })

            // request to update db high scores
            API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
              console.log(res);
            });

            console.log(newScores);
            return true;
          }
        }
      } else if (this.state.globalHighScores.length === 0) {
        // if no high scores, just add it to array as first item
        let playerInfo = {
          playerId: 1,
          score: this.props.score
        }

        var newScores = [
            playerInfo
        ];

        console.log("0 scores");
        console.log(newScores);

        this.setState({
          globalHighScores: newScores
        })

        // request to update db high scores
        API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
          console.log(res);
        });

      } else if (this.state.globalHighScores.length === 1) {
        // // if no high scores, just add it to array as first item
        // let playerInfo = {
        //   playerId: 1,
        //   score: this.props.score
        // }

        // var newScores = [
        //   playerInfo
        // ];

        // console.log("0 scores");
        // console.log(newScores);

        // if (playerInfo.score > this.state.globalHighScores[0].score) {
        //   var newScores = [

        //   ]
        // }

        // this.setState({
        //   globalHighScores: newScores
        // })

        // // request to update db high scores
        // API.updateGlobalHighScores(this.state.globalHighScores).then(res => {
        //   console.log(res);
        // });
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
