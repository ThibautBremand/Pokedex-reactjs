import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import Loader from "./Loader";
import ReactFooter from "./ReactFooter";
import bluePokeball from './img/blue_pokeball.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : '',
            isFetching : false,
            pokemonFound : false,

            name : '',
            id : '',
            types : [],
            sprite : '',
            detailedStats : {
                hp : '',
                atk : '',
                def : '',
                spAtk : '',
                spDef : '',
                spd : ''
            },
            evolChain : [],
            moves : []
        };
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
        /* Used to store the detailed stats into the state */
        let detailedStats = this.state.detailedStats;

        this.setState({
            name : '',
            id : '',
            sprite : '',
            types : [],
            detailedStats : {
                hp : '',
                atk : '',
                def : '',
                spAtk : '',
                spDef : '',
                spd : ''
            },
            evolChain : [],
            moves : []
        });

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

                                    /* Retrieves name */
                                    let name = `${pkmnList.forms[0].name} #${pkmnList.id}`
                                    this.setState({name})
                                    this.setState({id : pkmnList.id})

                                    /* Retrieves sprite */
                                    this.setState({sprite: pkmnList.sprites['front_default']})

                                    /* Retrieves types */
                                    pkmnList.types.forEach((type) => {
                                        this.setState({
                                            types: this.state.types.concat([type.type.name])
                                        })
                                    });

                                    /* Retrieves stats */
                                    pkmnList.stats.forEach((stat) => {
                                        if (stat.stat.name === 'hp') {
                                            detailedStats.hp = stat.base_stat;
                                            this.setState({detailedStats});
                                        }

                                        if (stat.stat.name === 'attack') {
                                            detailedStats.atk = stat.base_stat;
                                            this.setState({detailedStats});
                                        }

                                        if (stat.stat.name === 'defense') {
                                            detailedStats.def = stat.base_stat;
                                            this.setState({detailedStats});
                                        }

                                        if (stat.stat.name === 'special-attack') {
                                            detailedStats.spAtk = stat.base_stat;
                                            this.setState({detailedStats});
                                        }

                                        if (stat.stat.name === 'special-defense') {
                                            detailedStats.spDef = stat.base_stat;
                                            this.setState({detailedStats});
                                        }

                                        if (stat.stat.name === 'speed') {
                                            detailedStats.spd = stat.base_stat;
                                            this.setState({detailedStats});
                                        }
                                    });

                                    /* Retrieves evolution chain */
                                    let currentEvolution = evolutionChain.chain.evolves_to;
                                    this.setState({
                                        evolChain: this.state.evolChain.concat([evolutionChain.chain.species.name])
                                    });
                                    if (currentEvolution[0] !== null && currentEvolution.length > 0) {
                                        this.setState({
                                            evolChain: this.state.evolChain.concat([currentEvolution[0].species.name])
                                        })
                                    }
                                    if (currentEvolution[0].evolves_to[0] !== null && currentEvolution[0].evolves_to.length > 0) {
                                        this.setState({
                                            evolChain: this.state.evolChain.concat(currentEvolution[0].evolves_to[0].species.name)
                                        })
                                    }

                                    /* Retrieves moves */
                                    pkmnList.moves.forEach((move) => {
                                        move.version_group_details.forEach((move_version) => {
                                            if (move_version.version_group.name === 'sun-moon') {
                                                /* Gen 7 move, we can display it */
                                                if (move_version.move_learn_method.name === 'level-up') {
                                                    this.setState({
                                                        moves: this.state.moves.concat([{"level" : move_version.level_learned_at, "move" : move.move.name}])
                                                    })
                                                }
                                            }
                                        })
                                    })
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
                                    newPokemon = {this.newPokemon}

                                    name = {this.state.name}
                                    id = {this.state.id}
                                    types = {this.state.types}
                                    sprite = {this.state.sprite}
                                    detailedStats = {this.state.detailedStats}
                                    evolChain = {this.state.evolChain}
                                    moves = {this.state.moves}
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
                    <img className="bluePokeball" src={bluePokeball} alt=""/>

                    <ReactFooter
                    />
                </div>
            </div>
        )
    }
}

export default App;
