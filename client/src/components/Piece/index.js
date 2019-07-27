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
            timing: { duration: 750, ease: easeExpOut },
          })}
        >
          {(state) => {
            const { x , y } = state

            return (
              <div>
                <div
                  style={{
                    position: 'absolute',
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    opacity: 0.7,
                    backgroundColor: 'rgb(255, 255, 204)',
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                  }}>
                    A
                    <div style={{
                      position: "absolute",
                      top: "13px",
                      right: "1px",
                      fontSize: "12px",
                      lineHeight: "1",
                      zIndex: "6"
                    }}>1</div>
                </div>
                <br></br>
                <div
                  style={{
                    position: 'absolute',
                    top: 25,
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    opacity: 0.7,
                    backgroundColor: 'rgb(255, 255, 204)',
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                  }}>
                    B
                    <div style={{
                      position: "absolute",
                      top: "13px",
                      right: "1px",
                      fontSize: "12px",
                      lineHeight: "1",
                      zIndex: "6"
                    }}>1</div>
                </div>
                <br></br>
                <div
                  style={{
                    position: 'absolute',
                    top: 50,
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    opacity: 0.7,
                    backgroundColor: 'rgb(255, 255, 204)',
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                  }}>
                    C
                    <div style={{
                      position: "absolute",
                      top: "13px",
                      right: "1px",
                      fontSize: "12px",
                      lineHeight: "1",
                      zIndex: "6"
                    }}>1</div>
                </div>
              </div>
            )
          }}
        </Animate>
      </div>
    )
  }
}

export default Piece