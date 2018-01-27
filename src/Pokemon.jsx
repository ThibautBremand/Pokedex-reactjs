import React, { Component } from 'react';
import './Pokemon.css';

class Pokemon extends Component {

    render() {
        const BULBAPEDIA_URL = 'https://bulbapedia.bulbagarden.net/wiki/'
        let currentBulbapediaLink = `${BULBAPEDIA_URL}${this.props.pkmnList.forms[0].name}`
        let currentEvolution = this.props.evolutionChain.chain.evolves_to

        return (
            <div className="card Form-text">
                <div className="card-body">
                    <div className="row">

                        { /*Pokemon's name, photo and Bulbapedia link*/ }
                        <div className="col-md-5 col-xs-6 leftColumn">
                            <div className="row pokemonName center-block">{this.props.pkmnList.forms[0].name} #{this.props.pkmnList.id}</div>
                            <div className="row"><img className="center-block" src={this.props.pkmnList.sprites['front_default']} alt="Not found"/></div>
                            {
                                Object.values(this.props.pkmnList.types).map((type) => {
                                    return (
                                        <div className="center-block type">
                                            <span>{type.type.name}</span>
                                        </div>
                                    )
                                })
                            }
                            <div className="row"><a className="center-block" href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                        </div>

                        { /*Pokemon's stats*/ }
                        <div className="col-md-3 col-xs-6 leftColumn">
                        {
                            Object.values(this.props.pkmnList.stats).map((stat) => {
                                return (
                                    <div className="row"><span className="stats">{stat.stat.name} </span> : {stat.base_stat}</div>
                                )
                            })
                        }
                        </div>

                        {
                            this.props.evolutionChain !== null
                            ?
                                <div className="col leftColumn">
                                    <div className="row pokemonName center-block">Evolution chain</div>
                                    <div className="row center-block pokemonEvolName">{this.props.evolutionChain.chain.species.name}</div>

                                    {
                                        currentEvolution[0] !== null && currentEvolution.length > 0
                                        ?
                                            <div>
                                                <div className="row center-block pokemonEvolName">{currentEvolution[0].species.name}</div>
                                                {
                                                    currentEvolution[0].evolves_to[0] !== null && currentEvolution[0].evolves_to.length > 0
                                                    ?
                                                    <div className="row center-block pokemonEvolName">{currentEvolution[0].evolves_to[0].species.name}</div>
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
        )
    }
}

export default Pokemon;
