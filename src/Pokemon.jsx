import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, Panel, Alert } from 'react-bootstrap';
import './Pokemon.css';

class Pokemon extends Component {
    /*constructor(props) {
        super(props);
    }*/

    render() {
        const BULBAPEDIA_URL = 'https://bulbapedia.bulbagarden.net/wiki/'
        let currentBulbapediaLink = `${BULBAPEDIA_URL}${this.props.pkmnList.forms[0].name}`
        return (
            <Panel>
                <Panel.Body>
                    <div>
                        <div className="Form-text text">
                            <br/>
                                <div className="row pokemonName">{this.props.pkmnList.forms[0].name}</div>
                                <img src={this.props.pkmnList.sprites['front_default']}/>
                                <div className="row"><a href={this.props.pkmnList.forms[0].url} target="_blank">Link</a></div>
                                <div className="row"><a href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                                <br/>
                        </div>
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

export default Pokemon;
