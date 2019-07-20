import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class PageOne extends Component {
    render() {
        return (
            <div>
                <div>This is Page One!</div>
                <Link to="/page2">Go to Page 2</Link>
            </div>
        )
    }
}

export default PageOne;