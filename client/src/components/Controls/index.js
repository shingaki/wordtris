import React, { Component } from "react";
import "./style.css";

class Controls extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center main">
                    <button onClick={this.props.startClick}>Start</button>

                    
                    <button onClick={this.props.stopClick}>Stop</button><br />
                    
                    <button onClick={this.props.increaseClick}>Increase Speed</button>
                    
                    <button onClick={this.props.downClick}>Down</button><br />
                    
                    <br></br>

                    <button className="btn btn-secondary" onClick={this.props.leftClick}><i className="fas fa-chevron-left"></i></button>

                    <button className="btn btn-secondary cycle" onClick={this.props.cycleClick}><i className="fas fa-sync-alt"></i></button>

                    <button className="btn btn-secondary" onClick={this.props.rightClick}><i className="fas fa-chevron-right"></i></button>

                    <br />

                    <button className="btn btn-secondary down" onClick={this.props.downClick}><i className="fas fa-chevron-down"></i></button>

                </div>



                <div className="col-md-12 text-center mid-mobile">
                    <button onClick={this.props.startClick}>Start</button>


                    <button onClick={this.props.stopClick}>Stop</button><br />

                    <button onClick={this.props.increaseClick}>Increase Speed</button>

                    <button onClick={this.props.downClick}>Down</button><br />

                    <br></br>

                    <button className="btn btn-secondary cycle mb-3" onClick={this.props.cycleClick}><i className="fas fa-sync-alt"></i></button><br />

                    <button className="btn btn-secondary" onClick={this.props.leftClick}><i className="fas fa-chevron-left"></i></button>

                    <button className="btn btn-secondary" onClick={this.props.rightClick}><i className="fas fa-chevron-right"></i></button>

                    <br />

                    <button className="btn btn-secondary down" onClick={this.props.downClick}><i className="fas fa-chevron-down"></i></button>

                </div>
            </div>
        );
    }
}

export default Controls;
