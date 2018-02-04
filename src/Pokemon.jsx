import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {

    /***
     * Calls props to refresh and display the next Pokemon
     * */
    nextPokemon = () => {
        this.props.newPokemon(
            parseInt(this.props.id, 10) + 1
        );
    };

    /***
     * Calls props to refresh and display the previous Pokemon
     * */
    previousPokemon = () => {
        this.props.newPokemon(
            parseInt(this.props.id, 10) - 1
        );
    };

    /***
     * Calls props to refresh and display the clicked Pokemon
     * */
    clickedPokemon = (query) => {
        this.props.newPokemon(query);
    };

    render() {
        const BULBAPEDIA_URL = 'https://bulbapedia.bulbagarden.net/wiki/';
        const EVOLCHAINIMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
        const EVOLCHAINIMG_EXT = '.png';
        let currentBulbapediaLink = `${BULBAPEDIA_URL}${this.props.name}`;

        return (
            <div>
                <div className="card Form-text">
                    <div className="card-body">
                        <div className="row">

                            { /*Pokemon's name, photo and Bulbapedia link*/ }
                            <div className="col-md-4 col-xs-6 leftColumn">
                                <div className="row pokemonName center-block">{this.props.name}</div>
                                {
                                    this.props.sprite !== '' ?
                                        <div className="row"><img className="center-block" src={this.props.sprite}
                                                              alt="Not found"/></div>
                                    :
                                        <div></div>
                                }
                                { /* Types */ }
                                {
                                    this.props.types.map((type, k) => {
                                        return (
                                            <div key={k} className="center-block type">
                                                <span >{type}</span>
                                            </div>
                                        )
                                    })
                                }
                                <div className="row"><a className="center-block" href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                            </div>

                            { /*Pokemon's stats*/ }
                            <div className="col-md-4 col-xs-6 leftColumn">
                                <div className="row pokemonName center-block">Stats</div>
                                <div className="col">
                                    <div className="row statsList">
                                        <div className="stats">HP :</div>
                                        <div className="statsValue">{this.props.detailedStats.hp}</div>
                                    </div>
                                    <div className="row statsList">
                                        <div className="stats">Attack :</div>
                                        <div className="statsValue">{this.props.detailedStats.atk}</div>
                                    </div>
                                    <div className="row statsList">
                                        <div className="stats">Defense :</div>
                                        <div className="statsValue">{this.props.detailedStats.def}</div>
                                    </div>
                                    <div className="row statsList">
                                        <div className="stats">Special Attack :</div>
                                        <div className="statsValue">{this.props.detailedStats.spAtk}</div>
                                    </div>
                                    <div className="row statsList">
                                        <div className="stats">Special Defense :</div>
                                        <div className="statsValue">{this.props.detailedStats.spDef}</div>
                                    </div>
                                    <div className="row statsList">
                                        <div className="stats">Speed :</div>
                                        <div className="statsValue">{this.props.detailedStats.spd}</div>
                                    </div>
                                </div>
                            </div>

                            { /* Evolution chain */
                                <div className="col leftColumn">
                                    <div className="row pokemonName center-block">Evolution chain
                                    </div>
                                    {
                                        this.props.detailedEvolutionChain.map((evol, k) => {
                                            return (
                                                <div key={k}>
                                                    <img className="evolchainImg" src={`${EVOLCHAINIMG_URL}${evol.id}${EVOLCHAINIMG_EXT}`} alt="Not found"/>
                                                    <button className="row center-block btn btn-link pokemonEvolName" onClick={() => this.clickedPokemon(evol.name)}>{evol.name}</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>

                        { /* Moves */ }
                        <div className="row">
                            <div className="col-md-6 col-xs-6 leftColumn">
                                <div className="row">
                                    <div className="col">
                                        <div className="row pokemonName movesHeader center-block">Possible moves (Gen 7)</div>
                                        {
                                            this.props.detailedMoves.map((move, i) => {
                                                return (
                                                    <div className="row" key={i}>
                                                        <div className="col-md-1"></div>
                                                        <div className="movesLevel col">Level {move.level}</div>
                                                        <div className="movesName col">{move.name}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            { /* Moves tutors */ }
                            <div className="col-md-6 col-xs-6 leftColumn">
                                <div className="row">
                                    <div className="col">
                                        <div className="row pokemonName movesHeader center-block">Taught by tutors</div>
                                        {
                                            this.props.movesTutors.map((gen, l) => {
                                                let targetDiv = `collapseMoveTutor${l}`;
                                                let idTargetDiv = `#${targetDiv}`;
                                                console.log(targetDiv);
                                                return (
                                                    <div className="" key={l}>

                                                        <button className="btn btn-secondary" type="button" data-toggle="collapse" data-target={idTargetDiv}  aria-expanded="false" aria-controls={idTargetDiv}>
                                                            {gen[0].gen}
                                                        </button>

                                                        <div className="collapse" id={targetDiv}>
                                                            <div className="card card-block">
                                                            {
                                                                gen.map((move, i) => {
                                                                    return (
                                                                        <div className="row" key={i}>
                                                                            <div className="col-md-1"></div>
                                                                            <div className="movesLevel col">{move.gen}</div>
                                                                            <div className="movesName col">{move.name}</div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    parseInt(this.props.id, 10) > 1
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
