import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

const trackStyles = {
  borderRadius: 4,
  backgroundColor: 'gray',
  position: 'relative',
  margin: '5px 3px 10px',
  width: 250,
  height: 500,
}

class Piece extends PureComponent {
  state = {
    x:0,
    y:0,
    fallSpeed: 2000
  }

  startClick = () => {
    this.timerID = setInterval(
      () => this.tick(),
      this.state.fallSpeed
    );
  }
  stopClick = () => {
    clearInterval(this.timerID);
  }
  increaseClick = () => {
    this.setState({ fallSpeed: this.state.fallSpeed / 2 })
    clearInterval(this.timerID);
    this.timerID = setInterval(
      () => this.tick(),
      this.state.fallSpeed
    );
    
  }
  downClick = () => {
    if (this.state.y < 425) {
      this.setState({ y: this.state.y + 25 })
    }
    
  }
  leftClick = () => {
    if (this.state.x > 0) {
      this.setState({ x: this.state.x - 25 })
    }
  }
  rightClick = () => {
    if (this.state.x < 225) {
      this.setState({ x: this.state.x + 25 })
    }
  }

  tick() {
    if (this.state.y < 425){
      this.setState({ y: this.state.y + 25 })
    } else {
      clearInterval(this.timerID);
    }
  }



  render() {
    return (
      <div>
        <button
          onClick={this.startClick}
        >
          Start
        </button>
        <button
          onClick={this.stopClick}
        >
          Stop
        </button>
        <button
          onClick={this.increaseClick}
        >
          Increase Speed
        </button>
        <button
          onClick={this.downClick}
        >
          Down
        </button>
        <button
          onClick={this.leftClick}
        >
          Left
        </button>
        <button
          onClick={this.rightClick}
        >
          Right
        </button>
        <Animate
          start={() => ({
            x: 0,
            y: 0
          })}

          update={() => ({
            x: [this.state.x],
            y: [this.state.y],
            timing: { duration: 750, ease: easeExpOut },
          })}
        >
          {(state) => {
            const { x , y } = state

            return (
              <div style={trackStyles}>
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
                </div>
                <br></br>
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
                    B
                </div>
                <br></br>
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
                    C
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