import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {

    /***
     * Calls props to refresh and display the next Pokemon
     * */
    nextPokemon = () => {
        this.props.newPokemon(
            parseInt(this.props.pkmnList.id, 10) + 1
        );
    }

    /***
     * Calls props to refresh and display the previous Pokemon
     * */
    previousPokemon = () => {
        this.props.newPokemon(
            parseInt(this.props.pkmnList.id, 10) - 1
        );
    }

    /***
     * Calls props to refresh and display the clicked Pokemon
     * */
    clickedPokemon = (query) => {
        this.props.newPokemon(query);
    }

    render() {
        const BULBAPEDIA_URL = 'https://bulbapedia.bulbagarden.net/wiki/'
        let currentBulbapediaLink = `${BULBAPEDIA_URL}${this.props.pkmnList.forms[0].name}`
        let currentEvolution = this.props.evolutionChain.chain.evolves_to

        return (
            <div>
                <div className="card Form-text">
                    <div className="card-body">
                        <div className="row">

                            { /*Pokemon's name, photo and Bulbapedia link*/ }
                            <div className="col-md-5 col-xs-6 leftColumn">
                                <div className="row pokemonName center-block">{this.props.pkmnList.forms[0].name} #{this.props.pkmnList.id}</div>
                                <div className="row"><img className="center-block" src={this.props.pkmnList.sprites['front_default']} alt="Not found"/></div>
                                {
                                    Object.values(this.props.pkmnList.types).map((type, k) => {
                                        return (
                                            <div key={k} className="center-block type">
                                                <span >{type.type.name}</span>
                                            </div>
                                        )
                                    })
                                }
                                <div className="row"><a className="center-block" href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                            </div>

                            { /*Pokemon's stats*/ }
                            <div className="col-md-3 col-xs-6 leftColumn">
                            {
                                Object.values(this.props.pkmnList.stats).map((stat, k) => {
                                    return (
                                        <div className="row" key={k}><span className="stats">{stat.stat.name} </span> : {stat.base_stat}</div>
                                    )
                                })
                            }
                            </div>

                            {
                                this.props.evolutionChain !== null
                                ?
                                    <div className="col leftColumn">
                                        <div className="row pokemonName center-block">Evolution chain</div>
                                        <button className="row center-block btn btn-link pokemonEvolName" onClick={() => this.clickedPokemon(this.props.evolutionChain.chain.species.name)}>{this.props.evolutionChain.chain.species.name}</button>

                                        {
                                            currentEvolution[0] !== null && currentEvolution.length > 0
                                            ?
                                                <div>
                                                    <button className="row center-block btn btn-link pokemonEvolName" onClick={() => this.clickedPokemon(currentEvolution[0].species.name)}>{currentEvolution[0].species.name}</button>
                                                    {
                                                        currentEvolution[0].evolves_to[0] !== null && currentEvolution[0].evolves_to.length > 0
                                                        ?
                                                            <button className="row center-block btn btn-link pokemonEvolName" onClick={() => this.clickedPokemon(currentEvolution[0].evolves_to[0].species.name)}>{currentEvolution[0].evolves_to[0].species.name}</button>
                                                        :
                                                        <div></div>
                                                    }
                                                </div>
                                            :
                                            <div></div>

                                        }
                                    </div>
                                :
                                    <div></div>
                            }
                        </div>
                    </div>
                </div>
                {
                    parseInt(this.props.pkmnList.id, 10) > 1
                    ?
                        <button onClick={() => this.previousPokemon()} className="btn btn-secondary navPokemon navPokemonLeft"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    :
                        <div></div>
                }
                <button onClick={() => this.nextPokemon()} className="btn btn-secondary navPokemon navPokemonRight"><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
        )
    }
}

export default Pokemon;
