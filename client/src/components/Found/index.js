import React, { PureComponent } from 'react'


class Found extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Last Found Word:
        </div>
        <div>
          {this.props.foundWord} ({this.props.foundWordValue})



        </div>
      </div>
    )
  }
}

export default Found;