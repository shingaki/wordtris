import React, { Component } from "react";
import "./style.css";

class BonusAlert extends Component {
  render() {
    return (
      <div>
        <div
          className={
            this.props.BonusVisable === "two"
              ? "fadeInTwo"
              : this.props.BonusVisable === "three"
              ? "fadeInThree"
              : this.props.BonusVisable === "four"
              ? "fadeInFour"
              : this.props.BonusVisable === "OhTwo"
              ? "fadeOutTwo"
              : this.props.BonusVisable === "OhThree"
              ? "fadeOutThree"
              : this.props.BonusVisable === "OhFour"
              ? "fadeOutFour"
              : "fadeOut"
          }
        >
          LETTER BONUS{" "}
          {this.props.BonusVisable === "two"
            ? "X2"
            : this.props.BonusVisable === "three"
            ? "X3"
            : this.props.BonusVisable === "four"
            ? "X4"
            : this.props.BonusVisable === "OhTwo"
            ? "X2"
            : this.props.BonusVisable === "OhThree"
            ? "X3"
            : this.props.BonusVisable === "OhFour"
            ? "X4"
            : ""}
        </div>
      </div>
    );
  }
}

export default BonusAlert;
