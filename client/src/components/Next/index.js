import React, { PureComponent } from 'react'

const trackStyles = {
  borderRadius: 4,
  backgroundColor: '#393e46',
  position: 'relative',
  margin: '5px 3px 10px',
  marginLeft: "auto",
  marginRight: "auto",
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
              opacity: 1,
              backgroundColor: 'rgb(216, 203, 187)',
              top: 25,
              left: 25,
            };

            return(
              <div
                style={ style } key={i}>
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
      </div>
    )
  }
}

export default Next;