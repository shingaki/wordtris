import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

const trackStyles = {
  borderRadius: 4,
  backgroundColor: 'gray',
  position: 'relative',
  margin: '5px 3px 10px',
  width: 75,
  height: 125,
}

class Next extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Next Piece:
        </div>
        <div style={trackStyles}>




          {this.props.nextUp.map((item, i) => {
            let style = {
              position: 'relative',
              width: 25,
              height: 25,
              borderRadius: 4,
              opacity: 0.7,
              backgroundColor: 'rgb(255, 255, 204)',
              top: 25,
              left: 25,
            };

            return(
              <div
                style={ style }>
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











          {/* <div
            style={{
              position: 'relative',
              width: 25,
              height: 25,
              borderRadius: 4,
              opacity: 0.7,
              backgroundColor: 'rgb(255, 255, 204)',
              top: 25,
              left: 25,
              // WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              // transform: `translate3d(${x}px, ${y}px, 0)`,
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
          <div
            style={{
              position: 'relative',
              width: 25,
              height: 25,
              borderRadius: 4,
              opacity: 0.7,
              backgroundColor: 'rgb(255, 255, 204)',
              top: 25,
              left: 25,
              // WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              // transform: `translate3d(${x}px, ${y}px, 0)`,
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
          <div
            style={{
              position: 'relative',
              width: 25,
              height: 25,
              borderRadius: 4,
              opacity: 0.7,
              backgroundColor: 'rgb(255, 255, 204)',
              top: 25,
              left: 25,
              // WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              // transform: `translate3d(${x}px, ${y}px, 0)`,
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
          </div> */}
        </div>
      </div>
    )
  }
}

export default Next;