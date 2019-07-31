import React, { Component } from "react";
import "./style.css";

class Controls extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <button onClick={this.props.startClick}>Start</button>

                    
                    <button onClick={this.props.stopClick}>Stop</button><br />
                    
                    <button onClick={this.props.increaseClick}>Increase Speed</button>
                    
                    <button onClick={this.props.downClick}>Down</button><br />
                    
                    <br></br>

                    <button onClick={this.props.leftClick}>Left</button>

                    <button className="cycle" onClick={this.props.cycleClick}></button>

                    <button onClick={this.props.rightClick}>Right</button>

                </div>
            </div>
        );
    }
}

export default Controls;
