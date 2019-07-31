import React, { PureComponent } from 'react'
import Piece from "../Piece"
import PlacedPieces from "../PlacedPieces"

const boardStyle = {
  borderRadius: 4,
  backgroundColor: 'gray',
  position: 'relative',
  margin: '5px 3px 10px',
  width: 250,
  height: 500,
}
const boardCover = {
  borderRadius: 4,
  backgroundColor: 'white',
  position: 'absolute',
  margin: '5px 3px 10px',
  width: 250,
  height: 75,
  top: -75,
  zIndex: 7
}

class GameArea extends PureComponent {
 
  render() {
    return (
      <>
        <div style={boardCover} >

        </div>
        <div style={boardStyle} >
          <Piece 
            id = {this.props.currentPieceID}
            currentPieceX = {this.props.currentPieceX}
            currentPieceY = {this.props.currentPieceY}
            pieceSpeed = {this.props.pieceSpeed}
            playLetters={this.props.playLetters}
            
          />
          <PlacedPieces 
            placedLetters={this.props.placedLetters}
          />

        </div>
      </>
    )
  }
}

export default GameArea;