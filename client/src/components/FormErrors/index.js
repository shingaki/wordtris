import React, { Component } from "react";
import "./style.css";

class FormErrors extends Component {

    render() {
        return (
            <div>
                <p className={this.props.className}>
                    {this.props.children}
                </p>
            </div>               
        );
    }
}

export default FormErrors;
