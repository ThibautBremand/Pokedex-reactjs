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
        this.newPokemon = this.newPokemon.bind(this);
        this.BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
    }

    /***
     * Search function from user input, calls the API and fills the state with the fetched data
     * */
    search() {
        let FETCH_URL = `${this.BASE_URL}${this.state.query.toLowerCase()}`;
        this.setState({isFetching:false, pokemonFound:false});
        this.fetchAPI(FETCH_URL);
    }

    /***
     * Fetch API function, calls the API using the given parameter
     */
    fetchAPI(FETCH_URL) {
        /* Queries the API with the user's input */
        fetch(FETCH_URL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(json => {
                const pkmnList = json;
                this.setState({pkmnList});

                /* Checks if the query entered by the user retrieves Pokemon results or not */
                if ("species" in json) {
                    /* Result found by the API, we can query the species and evolution chain */
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
                    /* The user entered a wrong query */
                    this.setState({pokemonFound : false})
                }
            });
    }

    /**
     * Refreshes the displayed Pokemon, for example when the user clicks on the Next button
     */
    newPokemon(query) {
        let FETCH_URL = `${this.BASE_URL}${query}`;
        this.setState({isFetching:false, pokemonFound:false});
        this.fetchAPI(FETCH_URL);
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
                                    newPokemon = {this.newPokemon}
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
