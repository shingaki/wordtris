import React, { PureComponent } from 'react'
import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'


class Found extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Last Found Word:
        </div>
        <div>
          {this.props.foundWord}
        </div>
      </div>
    )
  }
}

export default Found;