import React, { PureComponent } from 'react'


class Found extends PureComponent {
  render() {
    return (
      <div>
        <div>
          Last Found Word:
        </div>
        <div>
          {/* {this.props.foundWord} ({this.props.foundWordValue}) */}
          {this.props.allFoundWords.map(word => {
            return (
              <div>{word.word} ({word.value})</div>
            )
          })}

        </div>
      </div>
    )
  }
}

export default Found;