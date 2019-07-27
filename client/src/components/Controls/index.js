import React, { Component } from "react";
import "./style.css";

class Controls extends Component {

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-12 text-center">
                    {/* <button onClick={this.startClick}>Start</button>
                    
                    <button onClick={this.stopClick}>Stop</button><br />
                    
                    <button onClick={this.increaseClick}>Increase Speed</button>
                    
                    <button onClick={this.downClick}>Down</button><br />
                    
                    <button onClick={this.leftClick}>Left</button>
                    
                    <button onClick={this.rightClick}>Right</button> */}


                    <button onClick={this.props.leftClick}>Left</button>

                    <button className="cycle"></button>

                    <button onClick={this.props.rightClick}>Right</button>

                </div>
            </div>
        );
    }
}

export default Controls;
