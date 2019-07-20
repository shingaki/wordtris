import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class PageTwo extends Component {
    render() {
        return (
            <div>
                <div>This is Page Two!</div>
                <Link to="/page1">Go to Page 1</Link>
            </div>
        )
    }
}

export default PageTwo;