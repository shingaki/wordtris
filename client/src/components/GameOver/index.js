import React, { Component } from "react";
import "./style.css";

class GameOver extends Component {
  render() {
    return (
      <>
        <div className="row text-center mt-5">
          <div className="col-md-12">
            <h1>Wordtris</h1>
          </div>
        </div>

        <div className="row text-center mt-3 desk">
          <div className="col-md-9" style={{ minHeight: 75 }}>
            <div className="row justify-content-center align-items-center">
              <div className="col-md-10 text-left">
                <h1>GAME OVER!</h1>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-10 text-left">
                <h4>Your Score: {this.props.score}</h4>
                <h4>Your Level: {this.props.level}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-center">
            <h3 className="mb-4">Play Again?</h3>

            <button
              onClick={this.props.GameNotOver}
              className="btn btn-primary btn-lg"
            >
              PLAY AGAIN &#8680;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default GameOver;
