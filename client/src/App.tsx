import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Registration from './components/registration';
import Choose_Game from './components/choose_game';
import Game from './components/game';
import Admin from './components/admin';
import PageNotFound from './components/pageNotFoung';

const App: FunctionComponent = () => {

  return (
    
       <Router>
       <div>
             { /*Création d'une div pour gérer l'opacitée*/ }
             <div id="opacity"></div>
             { /*Le système de gestion des routes de notre application*/ }
             <Switch>
                  <Route exact path="/" component={ Home }/>
                  <Route exact path="/login" component={ Login }/>
                  <Route exact path="/registration" component={ Registration }/>
                  <Route exact path="/choose_game" component={ Choose_Game }/>
                  <Route exact path="/game" component={ Game }/>
                  <Route exact path="/admin" component={ Admin }/>
                  <Route component={ PageNotFound }/>
             </Switch>
       </div>
       </Router>
       
  );
}

export default App;
