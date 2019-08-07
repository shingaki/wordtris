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
            opacity: 0.8,
            backgroundColor: 'rgba(216, 203, 187)',
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

          if (item.bgColor !== "" && item.textColor !== "") {
            style.backgroundColor = item.bgColor;
            style.color = item.textColor;
          } else if (item.bonus === 2) {
            style.backgroundColor = "rgb(0, 204, 255)"
          } else if (item.bonus === 3) {
            style.backgroundColor = "rgb(255,221,103)"
          } else if (item.bonus === 4) {
            style.backgroundColor = "rgb(255,143,229)"
          } 

          return (
            
            <div
              style={style} data-id={i}
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