import React, { Component } from "react";
import "./style.css";

let alert = false;
class BonusAlert extends Component {
  render() {
    return (
      <div>
        <div className={this.props.BonusVisable ? "fadeIn" : "fadeOut"}>
          LETTER BONUS
        </div>
      </div>
    );
  }
}

export default BonusAlert;
