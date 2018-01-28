import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import Loader from "./Loader";
import ReactFooter from "./ReactFooter";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            pkmnList: null,
            species:null,
            evolutionChain: null,
            isFetching: false,
            pokemonFound : false
        }
    }

    /***
     * Search function, calls the API and fills the state with the fetched data
     * */
    search() {
        const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
        let FETCH_URL = `${BASE_URL}${this.state.query.toLowerCase()}`;
        this.setState({isFetching:false, pokemonFound:false});

        fetch(FETCH_URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                const pkmnList = json;
                this.setState({pkmnList});

                /* Checks if the query entered by the user retrieves Pokemon results or not */
                if ("species" in json) {
                    this.setState({isFetching:true, pokemonFound : true})
                    fetch(this.state.pkmnList.species.url, {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(json => {
                            const species = json;
                            this.setState({species});

                            fetch(this.state.species.evolution_chain.url, {
                                method: 'GET'
                            })

                                .then(response => response.json())
                                .then(json => {
                                    const evolutionChain = json;
                                    this.setState({evolutionChain, isFetching: false});
                                });
                        });
                }
                else {
                    this.setState({pokemonFound : false})
                }
            });
    }

    render() {
        return (
            <div className="App">
                <h1 className="App-title">Pokedex Master</h1>
                <h4 className="App-title">Gotta find 'em all !</h4>

                <div className="container-fluid">
                    <div className="form-group">
                        <div className="input-group">
                            <input className="form-control col-md-5 offset-md-3"
                                type="text"
                                placeholder="Search for a Pokemon name or number"
                                value={this.state.query}
                                onChange={event => {this.setState({query: event.target.value})}}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        this.search()
                                    }
                                }}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" onClick={() => this.search()}><i className="fa fa-search" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.pokemonFound === true
                            ?
                            this.state.evolutionChain !== null
                                ?
                                <Pokemon
                                    pkmnList={this.state.pkmnList}
                                    evolutionChain ={this.state.evolutionChain}
                                />
                                : <div></div>
                            : <div></div>
                    }

                    {
                        this.state.isFetching !== false
                            ?
                            <Loader
                            />
                            : <div></div>
                    }

                    <ReactFooter
                    />
                </div>
            </div>
        )
    }
}

export default App;
