import React, { useState, useEffect } from 'react';
import './choose_game.css';

const Choose_Game = () => {

    return (
        <form id="chooseGame">
            <input type="submit" value="Un Joueur"/>
            <input type="submit" value="Deux Joueurs"/>
        </form>
    );
}

export default Choose_Game;