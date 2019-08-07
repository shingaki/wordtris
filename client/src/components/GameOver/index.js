import React, { Component } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

class GameOver extends Component {
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
