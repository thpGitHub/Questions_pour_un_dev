import React from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import './game.css'

const Game = () => {
    const history = useHistory();
    // const location = useLocation();
    // const myparam = location.state.params;
    // console.log('props in game page === ',props);

    return (
        <main id="container_playground">
            <section id="playground">
                <header id="timer">
                    <article id="timer_number">15</article>
                </header>
                <aside id="side_left">
                    <div>Joueur 1</div>
                    <div>{ history.location.state }</div>
                    <div>score :<span id="score_player_two"> 0</span></div>
                </aside>
                <aside id="side_middle">
                    <section id="message">
                        <div id="message_one_player">message one player</div>
                        <div id="message_all_players">message all players</div>
                    </section>
                    <section id="question">
                        {/* <h2>Question</h2> */}
                        <div>Ici la question</div>
                    </section>
                    <section id="responses">
                        <div id="response_a">A:</div>
                        <div id="response_b">B:</div>
                        <div id="response_c">C:</div>
                        <div id="response_d">D:</div>
                    </section>
                </aside>
                <aside id="side_right">
                    <div>Joueur 2</div>
                    <div>nom 2</div>
                    <div>score :<span id="score_player_two"> 0</span></div>
                </aside>    
            </section>
        </main>
    );
}

export default Game;