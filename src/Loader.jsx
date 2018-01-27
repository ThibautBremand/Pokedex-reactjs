import React, { Component } from 'react';
import './PokeballsLoader.css';

class Loader extends Component {
    render() {
        return (
            <div id="loading">
                <div class="pokeball" id="normal"></div>
                <div class="pokeball" id="great"></div>
                <div class="pokeball" id="ultra"></div>
                <div class="pokeball" id="master"></div>
                <div class="pokeball" id="safari"></div>
            </div>
        )
    }
}

export default Loader;