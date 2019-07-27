import React, { PureComponent } from 'react'

class PlacedBox extends PureComponent {
  render() {
    return (
  
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
               
    )
  }
}

export default PlacedBox