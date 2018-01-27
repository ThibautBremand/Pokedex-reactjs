import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Pokemon from './Pokemon';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            pkmnList: null
        }
    }

    search() {
        const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
        let FETCH_URL = `${BASE_URL}${this.state.query.toLowerCase()}`;

        fetch(FETCH_URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                const pkmnList = json;
                this.setState({pkmnList});
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Pokedex Master</div><br/>

                <FormGroup>
                    <InputGroup className="col-xs-offset-2 col-xs-8 col-md-offset-4 col-md-4">
                        <FormControl
                            type="text"
                            placeholder="Search for a Pokemon"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                {
                    this.state.pkmnList !== null
                        ?
                        <div>
                            <Pokemon
                                pkmnList={this.state.pkmnList}
                            />
                        </div>
                        : <div></div>
                }

            </div>
        )
    }
}

export default App;
