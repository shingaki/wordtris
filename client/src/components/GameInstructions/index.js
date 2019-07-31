import React, { Component } from 'react'
import "./style.css"


class GameInstructions extends Component {
    style1 = {
        position: 'relative',
        display: 'block',
        margin: "0 auto",
        width: 25,
        height: 25,
        borderRadius: 4,
        opacity: 1,
        backgroundColor: 'rgb(216, 203, 187)',
    };

    style2 = {
        position: 'relative',
        display: 'block',
        margin: "0 auto",
        width: 25,
        height: 25,
        borderRadius: 4,
        opacity: 1,
        backgroundColor: 'rgb(216, 203, 187)',
    };

    style3 = {
        position: 'relative',
        display: 'block',
        margin: "0 auto",
        width: 25,
        height: 25,
        borderRadius: 4,
        opacity: 1,
        backgroundColor: 'rgb(216, 203, 187)',
        // textAlign: "center"
    };

    render() {
        return (
            <>
            <div className="row text-center mt-5">
                <div className="col-md-12">
                    <h1>Wordtris</h1>
                </div>
            </div>

            <div className="row text-center mt-3 desk">
                <div className="col-md-9" style={{minHeight: 75}}>
                            
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-2">
                            <div style={{ maxWidth: 200, padding: 5, backgroundColor: "#393e46"}}>
                                <div style={this.style1}>
                                    A
                                    <div style={{
                                        position: "absolute",
                                        top: "13px",
                                        right: "1px",
                                        fontSize: "10px",
                                        lineHeight: "1",
                                        zIndex: "6"
                                    }}>1</div>
                                </div>

                                <div style={this.style2}>
                                    B
                                    <div style={{
                                        position: "absolute",
                                        top: "13px",
                                        right: "1px",
                                        fontSize: "10px",
                                        lineHeight: "1",
                                        zIndex: "6"
                                    }}>3</div>
                                </div>

                                <div style={this.style3}>
                                    C
                                <div style={{
                                        position: "absolute",
                                        top: "13px",
                                        right: "1px",
                                        fontSize: "10px",
                                        lineHeight: "1",
                                        zIndex: "6"
                                    }}>3</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 text-left">
                            Pieces fall from the top of the screen.  Each piece has three letters on it.
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-2">
                            <button className="cycle" style={{verticalAlign: "middle"}} onClick={this.props.cycleClick}></button>
                        </div>
                        <div className="col-md-10 text-left">
                            Cycle the order of the letters by pressing the up arrow on your keyboard or this button on the screen.
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-2">
                            {`< >`}
                        </div>
                        <div className="col-md-10 text-left">
                            Left and right arrows on your keyboard (or the arrows on the screen) will move the falling piece left and right, respectfully.
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12 text-center">
                            When the piece lands, if it has formed a word (either horizontally or vertically), then that word's points will be added to your total score and those letters will disappear from the screen.
                        </div>
                    </div>


                </div>
                <div className="col-md-3 text-center">
                    <h3 className="mb-4">Ready to play?</h3>

                    <button onClick={this.props.startGame} className="btn btn-primary btn-lg">START &#8680;</button>
                </div>
            </div>                
            {/* <div className="row text-center mt-3">
                <div className="col-md-12">

                    When the piece lands, if it has formed a word (either horizontally or vertically), then that word's points will be added to your total score and those letters will disappear from the screen.<br /><br />

                    Ready to play?<br /><br />

                    <button onClick={this.props.startGame}>START</button>
                </div>
            </div> */}

            <div className="mobile">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-2 m-instructions">
                        <div style={{ maxWidth: 200, padding: 5, backgroundColor: "#393e46"}}>
                            <div style={this.style1} className="text-center">
                                A
                                <div style={{
                                    position: "absolute",
                                    top: "13px",
                                    right: "1px",
                                    fontSize: "10px",
                                    lineHeight: "1",
                                    zIndex: "6"
                                }}>1</div>
                            </div>

                            <div style={this.style2} className="text-center">
                                B
                                <div style={{
                                    position: "absolute",
                                    top: "13px",
                                    right: "1px",
                                    fontSize: "10px",
                                    lineHeight: "1",
                                    zIndex: "6"
                                }}>3</div>
                            </div>

                            <div style={this.style3} className="text-center">
                                C
                            <div style={{
                                    position: "absolute",
                                    top: "13px",
                                    right: "1px",
                                    fontSize: "10px",
                                    lineHeight: "1",
                                    zIndex: "6"
                                }}>3</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 text-left m-instructions">
                        Pieces fall from the top of the screen.  Each piece has three letters on it.
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-2 text-center m-instructions">
                        <button className="cycle" style={{verticalAlign: "middle"}} onClick={this.props.cycleClick}></button>
                    </div>
                    <div className="col-md-10 text-left m-instructions">
                        Cycle the order of the letters by pressing the up arrow on your keyboard or this button on the screen.
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-2 text-center m-instructions">
                        {`< >`}
                    </div>
                    <div className="col-md-10 text-left m-instructions">
                        Left and right arrows on your keyboard (or the arrows on the screen) will move the falling piece left and right, respectfully.
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        When the piece lands, if it has formed a word (either horizontally or vertically), then that word's points will be added to your total score and those letters will disappear from the screen.
                    </div>
                </div>

                <div className="col-md-3 text-center mt-4">
                    <h3 className="mb-4">Ready to play?</h3>

                    <button onClick={this.props.startGame} className="btn btn-primary btn-lg">START &#8680;</button>
                </div>
            </div>

            </>
        )
    }
}

export default GameInstructions;