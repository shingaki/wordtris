import React, { Component } from 'react';
import '../index.css';

class ListItem extends Component {
    render() {
        return (
            <div className="box">
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
                <p>{this.props.served}</p>
            </div>
        )
    }
}

export default ListItem;