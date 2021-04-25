import React from 'react'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';

const App = () => {

  return (
    
       <Router>
       <div>
             { /*Création d'une div pour gérer l'opacitée*/ }
             <div id="opacity"></div>
             { /*Le système de gestion des routes de notre application*/ }
             <Switch>
                  <Route exact path="/" component={ Home }/>
                  {/* <Route exact path="/pokemons" component={ PokemonList }/>
                  <Route exact path="/pokemon/add" component={ PokemonAdd }/>
                  <Route exact path="/pokemons/edit/:id" component={ PokemonEdit }/>
                  <Route exact path="/pokemon/:id" component={ PokemonDetail }/>
                  <Route component={ PageNotFound }/> */}
             </Switch>
       </div>
       </Router>
       
  );
}

export default App;
