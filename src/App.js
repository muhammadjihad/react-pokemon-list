import React, {Component} from 'react';
import './App.css';
import Card from './components/Card.js';
import pokeball from './assets/pokeball.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DetailPokemon from './components/DetailPokemon.js';

class App extends Component{
  constructor(){
    super();
    this.state={
      'teks':'mantap',
      'dataPokemon':[],
      'loading':true,
      'pokemonDataDisplay':[],
      'position':0,
      'length':10,
      'clickCount':0,
      'loadMoreStatus':false,
      'elementPosition':'',
    }
  }

  getDataPokemon=()=>{
    if(localStorage.dataPokemon === undefined){
      fetch("https://pokemon-go1.p.rapidapi.com/pokemon_stats.json", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
          "x-rapidapi-key": "2986cfbd5amsh28a48f69f31a6f4p1981c9jsn61e2e3e7fc65"
        }
      })
      .then(data=>data.json())
      .then(json=>{
          var display=json.slice(this.state.position,(this.state.position+this.state.length))
          this.setState({
            'dataPokemon':json,
            'loading':false,
            'pokemonDataDisplay':display
          })
          localStorage.setItem('dataPokemon',JSON.stringify(json))
      })
    } else {
      var display=JSON.parse(localStorage.dataPokemon).slice(this.state.position,(this.state.position+this.state.length))
      this.setState({
        'dataPokemon':JSON.parse(localStorage.dataPokemon),
        'loading':false,
        'pokemonDataDisplay':display
      })
    }
  }

  componentDidMount(){
    
    this.getDataPokemon()
    document.addEventListener('scroll', this.trackLoad);
  }

  trackLoad=()=>{
    console.log(document.documentElement.scrollTop)
    if(document.documentElement.scrollTop >= 180){
      this.setState({
        'elementPosition':"fixedStyle"
      })
      console.log(this.state.elementPosition)
    }
    if(Math.ceil((document.documentElement.scrollTop + window.innerHeight)+300) >= document.documentElement.scrollHeight){
      var position=this.state.position+this.state.length
      var pokemonDataDisplay=[...this.state.pokemonDataDisplay]
      var dataPokemon=[...this.state.dataPokemon].slice(position,position+this.state.length)
      dataPokemon.forEach(el=>{
        pokemonDataDisplay.push(el)
      })
      this.setState({
        position,
        pokemonDataDisplay
      })
    }
  }

  render(){

    if(this.state.loading){
      return(
        <div>
          <div className="container">
            <h5>Loading ....</h5>
          </div>
        </div>
      );
    } else {
      if(this.state.pokemonDataDisplay.length === 0){
        return(
        <div style={{backgroundColor:'red'}}>
          {/* Search Box */}
          <div className={"container mt-3 "+"fixedStyle"}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Cari Pokemon</span>
              </div>
              <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.cariPokemonInput}
              />
            </div>
          </div>

          {/* Pokemon Cards */}
          <div className='container text-center'>
              <h6>Pokemon tidak ada ...</h6>
          </div>
          <div className="container text-center mt-5">
              <button className="btn btn-primary" onClick={this.loadPokemon}>Lebih Banyak Lagi ..</button>
          </div>
        </div>
        ) 
      }

      return(
        <div>
          {/* Search Box */}
          <div className="container mt-3">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                <img src={pokeball} style={{height:"25px"}}/>
                </span>
              </div>
              <input
              type="text"
              className="form-control"
              placeholder="Cari Nama Pokemon"
              aria-label="Nama Pokemon"
              aria-describedby="basic-addon1"
              onChange={this.cariPokemonInput}
              />
            </div>
          </div>
          
          {/* Sorting */}
          <div className="container text-center">
            <h6>Urutkan Berdasarkan</h6>
            <div className="row">
              <div className="col-3" style={{padding:"8px"}}>
                <button className="btn btn-primary" onClick={this.sortirNama}>Nama</button>
              </div>
              <div className="col-3" style={{padding:"8px"}}>
                <button className="btn btn-primary" onClick={this.sortirAttack}>Attack</button>
              </div>
              <div className="col-3" style={{padding:"8px"}}>
                <button className="btn btn-primary"onClick={this.sortirDefense}>Defense</button>
              </div>
              <div className="col-3" style={{padding:"8px"}}>
                <button className="btn btn-primary" onClick={this.sortirStamina}>Stamina</button>
              </div>
            </div>
            <hr/>
          </div>

          {/* Pokemon Cards */}
          <div className='container'>
            <div className="row">
              {this.state.pokemonDataDisplay.map((obj,key)=>{
                return(
                      <Card obj={obj} key={key} />
                );
              })}
            </div>
          </div>
          <div style={{height:"70px"}}>
              {this.state.loadMoreStatus ? (
                <div>Loading ....</div>
              ) : (
                null
              )}
          </div>
        </div>
      );
    }
  }

  sortirNama=()=>{
    var pokemonDataDisplay=[...this.state.dataPokemon]
    if(this.state.clickCount === 0){
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.pokemon_name > b.pokemon_name) ? 1 : -1
      })
      this.setState({
        clickCount:1
      })
    } else {
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.pokemon_name < b.pokemon_name) ? 1 : -1
      })
      this.setState({
        clickCount:0
      })
    }
    pokemonDataDisplay=pokemonDataDisplay.slice(0,this.state.position+this.state.length)
    this.setState({
      pokemonDataDisplay
    })
  }

  sortirAttack=()=>{
    var pokemonDataDisplay=[...this.state.dataPokemon]
    if(this.state.clickCount === 0){
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_attack > b.base_attack) ? 1 : -1
      })
      this.setState({
        clickCount:1
      })
    } else {
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_attack < b.base_attack) ? 1 : -1
      })
      this.setState({
        clickCount:0
      })
    }
    pokemonDataDisplay=pokemonDataDisplay.slice(0,this.state.position+this.state.length)
    this.setState({
      pokemonDataDisplay
    })
  }

  sortirDefense=()=>{
    var pokemonDataDisplay=[...this.state.dataPokemon]
    if(this.state.clickCount === 0){
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_defense > b.base_defense) ? 1 : -1
      })
      this.setState({
        clickCount:1
      })
    } else {
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_defense < b.base_defense) ? 1 : -1
      })
      this.setState({
        clickCount:0
      })
    }
    pokemonDataDisplay=pokemonDataDisplay.slice(0,this.state.position+this.state.length)
    this.setState({
      pokemonDataDisplay
    })
  }

  sortirStamina=()=>{
    var pokemonDataDisplay=[...this.state.dataPokemon]
    if(this.state.clickCount === 0){
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_stamina > b.base_stamina) ? 1 : -1
      })
      this.setState({
        clickCount:1
      })
    } else {
      pokemonDataDisplay=pokemonDataDisplay.sort((a,b)=>{
        return (a.base_stamina < b.base_stamina) ? 1 : -1
      })
      this.setState({
        clickCount:0
      })
    }
    pokemonDataDisplay=pokemonDataDisplay.slice(0,this.state.position+this.state.length)
    this.setState({
      pokemonDataDisplay
    })
  }

  cariPokemonInput=(e)=>{
    var dataPokemon=[...this.state.dataPokemon]
    dataPokemon=dataPokemon.filter((el)=>{
      return el.pokemon_name.toLowerCase().includes(e.target.value.toLowerCase());
    })
    if(e.target.value === ''){
      this.setState({
        'pokemonDataDisplay':dataPokemon.slice(0,this.state.position+this.state.length)
      })
    } else {
      this.setState({
        'pokemonDataDisplay':dataPokemon
      })
    }
  }

  loadPokemon=()=>{
    var position=this.state.position+this.state.length
    var pokemonDataDisplay=[...this.state.pokemonDataDisplay]
    var morePokemon=this.state.dataPokemon.slice(position,(position+this.state.length))
    morePokemon.forEach((el)=>{
      pokemonDataDisplay.push(el)
    })
    this.setState({
      'position':position,
      'pokemonDataDisplay':pokemonDataDisplay
    })
  }

}

export default App;