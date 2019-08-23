import React, { Component } from 'react';
import criticaldamage from '../assets/critical-damage.svg';
import shield from '../assets/shield.svg';
import stamina from '../assets/weightlifter.svg';
import { Route, Link } from 'react-router-dom';
import DetailPokemon from './DetailPokemon';
class Card extends Component {

    constructor(){
        super();
        this.state={
            iconSize:"50px"
        }
    }


    render() {
        return (
            <div className="container col-sm-6" id={this.props.obj.pokemon_id} style={{
                padding:"10px"
            }}>
                <div className="card text-center" style={{
                    margin:'auto',
                    boxShadow:"0 0 2px 2px black"
                }}> 
                        <Link to={"/"+this.props.obj.pokemon_id}>
                            <h6>{this.props.obj.pokemon_name}</h6>
                        </Link>
                        <Route path={"/"+this.props.obj.pokemon_id} component={DetailPokemon}></Route>
                    <hr/>
                    <div className="container" style={{
                        padding:"8px",
                        marginTop:"-20px"
                    }}>
                        <div className="row">
                            <div className="col-4 col-xs-4">
                                <img src={criticaldamage} style={{
                                    height:"25px",
                                }} />
                                <small>{this.props.obj.base_attack}</small>
                            </div>
                            <div className="col-4 col-xs-4">
                                <img src={shield} style={{
                                    height:"25px",
                                }} />
                                <small>{this.props.obj.base_defense}</small>
                            </div>
                            <div className="col-4 col-xs-4">
                                <img src={stamina} style={{
                                    height:"25px",
                                }} />
                                <small>{this.props.obj.base_stamina}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;