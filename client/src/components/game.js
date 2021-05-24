import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import { useLocation } from "react-router-dom";
import './game.css'

const ENDPOINT = "http://localhost:8001";

// let socket ="";


const Game = () => {
    /*
    * chooseGame = onePlayer or twoplayer
     */
    const [chooseGame, setChooseGame] = useState("");
    const [pseudoPlayer, setPseudoPlayer] = useState("");
    const [numberTimer, setNumberTimer] = useState(15);
    // let [socket, setSocket] = useState("");
    
    // const history = useHistory();
    // const pseudo = history.location.state;
    // setPseudoPlayer(pseudo);
    const history = useHistory();
    // let socket = "";
    useEffect(() => {
        /*
         * Connexion Websocket avec le server 
         */
        const socket = socketIOClient(ENDPOINT);
        socket.emit('chat message', "toitoi");
        socket.on('pseudo du gamer', (msg) => {
            console.log('message recu sur le navigateur: ' + msg);
        });
        socket.on('counter number', (msg) => {
            setNumberTimer(msg);
        });
        // socket.on("FromAPI", data => {
        //   setResponse(data);
        //   console.log(response);
        // })
        // const socket = socketIOClient(ENDPOINT);
        console.log(history);
        // setPseudoPlayer(history.location.state);
        // if(!pseudoPlayer) {
        //     console.log("c'est possible");
        //     console.log(pseudoPlayer);
        //}
      },[]);
    //   const socket = socketIOClient(ENDPOINT);
    //   console.log("socket === ", socket);


    //   setSocket.emit('chat message', "toitoi");
    // const history = useHistory();
    
    // for(let i=0; i<1; i++) {
    //     const pseudo = history.location.state;
    //     return setPseudoPlayer(pseudo);
    // }
    
    // setPseudoPlayer(history.location.state);
    console.log("pseudoPlayer", pseudoPlayer);
    // const location = useLocation();
    // const myparam = location.state.params;
    // console.log('props in game page === ',props);

    return (
        <main id="container_playground">
            <section id="playground">
                <header id="timer">
                    <article id="timer_number">{ numberTimer }</article>
                </header>
                <aside id="side_left">
                    <div>Joueur 1</div>
                    {/* <div>{ history.location.state }</div> */}
                    <div>{ pseudoPlayer }</div>
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