import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

class Piece extends PureComponent {

  render() {
    return (
      <div>
        <Animate
          start={() => ({
            x: 0,
            y: 0
          })}

          update={() => ({
            x: [this.props.currentPieceX],
            y: [this.props.currentPieceY],
            timing: { duration: [this.props.pieceSpeed], ease: easeExpOut },
            // timing: { duration: 750 },
          })}
        >
          {(state) => {
            const { x , y } = state

            return (
              <div>
                {this.props.playLetters.map((item, i) => {
                  let style = {
                    position: 'absolute',
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    opacity: 0.7,
                    backgroundColor: 'rgb(255, 255, 204)',
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                  };

                  if (i === 1) {
                    style.top = 25;
                  } else if (i === 2) {
                    style.top = 50;
                  }

                  return (
                    <div
                      style={style}
                      key={i}>
                      {item.letter}
                      <div style={{
                        position: "absolute",
                        top: "13px",
                        right: "1px",
                        fontSize: "12px",
                        lineHeight: "1",
                        zIndex: "6"
                      }}>{item.points}</div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Animate>
      </div>
    )
  }
}

export default Piece