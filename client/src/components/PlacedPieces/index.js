import React, { PureComponent } from 'react'

let myTop = 0;
let myLeft = 0;


class PlacedPieces extends PureComponent {
  
  render() {
    return (
      <div>
        {this.props.placedLetters.map((item, i) => {
          if (i === 0) {
            myTop = 0;
            myLeft = 0;
          }

          let style = {
            position: 'absolute',
            width: 25,
            height: 25,
            borderRadius: 4,
            opacity: 0.7,
            backgroundColor: 'rgb(255, 255, 204)',
            top: myTop,
            left: myLeft
          };
 
          if (i % 10 === 9) {
            myTop = myTop + 25
            myLeft = -25
          };

          myLeft = myLeft + 25;

          if (item.letter === "") {
            style.opacity = 0
          }

          return (
            
            <div
              style={style}
              >
              {item.letter}
              <div style={{
                position: "absolute",
                top: "13px",
                right: "1px",
                fontSize: "10px",
                lineHeight: "1",
                zIndex: "6"
              }}>{item.points}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default PlacedPieces;