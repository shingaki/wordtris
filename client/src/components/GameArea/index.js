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
          currentPieceX = {this.props.currentPieceX}
          currentPieceY = {this.props.currentPieceY}
        />
      </div>
    )
  }
}

export default GameArea;