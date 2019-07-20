import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class SecondPage extends Component {
    render() {
        return (
            <div>
                <div>This is First Page!</div>
                <Link to="/page2">Go to Page 2</Link>
            </div>
        )
    }
}

export default SecondPage;