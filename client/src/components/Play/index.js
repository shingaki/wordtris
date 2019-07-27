import React, { Component } from "react";
import Piece from "../Piece"
import "./style.css";

class Play extends Component {
  
    
    render() {
        return (
            <div className="container">

                <h1 className="text-center mt-5">Play</h1>

                <Piece />
                



            </div>
        );
    }
}

export default Play;
