import React, { PureComponent } from 'react'
import Piece from "../Piece"

const boradStyle = {
  borderRadius: 4,
  backgroundColor: 'gray',
  position: 'relative',
  margin: '5px 3px 10px',
  width: 250,
  height: 500,
}

class GameArea extends PureComponent {
 
  render() {
    return (
      <div style={boradStyle}>
        <Piece 
          id = {this.props.currentPieceID}
          currentPieceX = {this.props.currentPieceX}
          currentPieceY = {this.props.currentPieceY}
          playLetters={this.props.playLetters}
        />

      </div>
    )
  }
}

export default GameArea;