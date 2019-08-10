import React, { Component } from "react";
import "./style.css";

class BonusAlert extends Component {

  render() {
    return (
      <div>
        <div 
        className={this.props.BonusVisable === "two" ? "fadeInTwo" :this.props.BonusVisable === "three" ? "fadeInThree":this.props.BonusVisable === "four" ? "fadeInFour":"fadeOut"}>
          LETTER BONUS {this.props.BonusVisable === "two" ? "X2" :this.props.BonusVisable === "three" ? "X3":this.props.BonusVisable === "four" ? "X4": ""}
        </div>
      </div>
    );
  }
}

export default BonusAlert;
