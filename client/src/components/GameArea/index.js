import React, { PureComponent } from 'react'
import "./style.css";
import Piece from "../Piece"
import PlacedPieces from "../PlacedPieces"

const boardStyle = {
  borderRadius: 4,
  backgroundColor: '#393e46',
  position: 'relative',
  margin: '5px 3px 10px',
  marginLeft: "auto",
  marginRight: "auto",
  width: 250,
  height: 500,
}
const boardCover = {
  borderRadius: 4,
  backgroundColor: '#eee',
  position: 'absolute',
  margin: '5px 3px 10px',
  width: 300,
  height: 75,
  top: -75,
  left: 105,
  zIndex: 7
}

class GameArea extends PureComponent {
 
  render() {
    return (
      <>
        <div style={boardCover} className="board-cover" >

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