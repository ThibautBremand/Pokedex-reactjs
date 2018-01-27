import React, { Component } from 'react';
/*import { Col, Panel } from 'react-bootstrap';*/
import './Pokemon.css';

class Pokemon extends Component {

    render() {
        const BULBAPEDIA_URL = 'https://bulbapedia.bulbagarden.net/wiki/'
        let currentBulbapediaLink = `${BULBAPEDIA_URL}${this.props.pkmnList.forms[0].name}`
        return (
            <div className="card Form-text">
                <div className="card-body">
                    <div className="row">

                        { /*Pokemon's name, photo and Bulbapedia link*/ }
                        <div className="col leftColumn">
                            <div className="row pokemonName center-block">{this.props.pkmnList.forms[0].name} #{this.props.pkmnList.id}</div>
                            <div className="row"><img className="center-block" src={this.props.pkmnList.sprites['front_default']} alt="Not found"/></div>
                            <div className="row"><a className="center-block" href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                        </div>

                        { /*Pokemon's stats*/ }
                        <div className="col leftColumn">
                        {
                            Object.values(this.props.pkmnList.stats).map((stat) => {
                                return (
                                    <div>
                                        <div className="row">{stat.stat.name} : {stat.base_stat}</div>
                                    </div>
                                )
                            })
                        }
                        </div>

                        <div className="col leftColumn">
                            <div className="row pokemonName center-block">{this.props.pkmnList.forms[0].name} #{this.props.pkmnList.id}</div>
                            <div className="row"><img className="center-block" src={this.props.pkmnList.sprites['front_default']} alt="Not found"/></div>
                            <div className="row"><a className="center-block" href={currentBulbapediaLink} target="_blank">Bulbapedia</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Pokemon;
