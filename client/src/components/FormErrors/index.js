import React, { Component } from "react";
import "./style.css";

class FormErrors extends Component {

    render() {
        return (
            <div>
                <p className="form-error">
                    {this.props.children}
                </p>
            </div>               
        );
    }
}

export default FormErrors;
