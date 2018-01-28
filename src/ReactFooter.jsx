import React, { Component } from 'react';
import './ReactFooter.css';
import reactLogo from './img/react-hexagon.png'

class ReactFooter extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <img className="reactLogo" src={reactLogo} alt="Made with ReactJS"/>
                    <span className="madeWithReact">Made with React</span>
                </div>
            </footer>
        )
    }
}

export default ReactFooter;