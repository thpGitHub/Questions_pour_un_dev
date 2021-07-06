import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import './game.css'

const ENDPOINT = "http://localhost:8001";
/*
* Connexion Websocket avec le server 
* Le serveur est sur le port 8001
*/
const socket = socketIOClient(ENDPOINT);

const Game = () => {
    /*
    * chooseGame = onePlayer or twoplayer
     */
    const [pseudoPlayerOne, setPseudoPlayerOne] = useState("");
    const [numberTimer, setNumberTimer] = useState(15);
    const [messageOnePlayer, setMessageOnePlayer] = useState("");
    const [messageAllPlayer, setMessageAllPlayer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [responseA, setResponseA] = useState("");
    const [responseB, setResponseB] = useState("");
    const [responseC, setResponseC] = useState("");
    const [responseD, setResponseD] = useState("");
    const [playerResponse, setPlayerResponse] = useState("");
    const [scorePlayerOne, setscorePlayerOne] = useState("");
    
    const history = useHistory();
        
    useEffect(() => {
        console.log("playerResponse Change", playerResponse);

        socket.emit("player response", playerResponse);
    },[playerResponse]);

    useEffect(() => {
        /*
         * Connexion Websocket avec le server 
         */
        // const socket = socketIOClient(ENDPOINT);

        // socket.emit('pseudo du gamer', history.location.state.pseudo);
        socket.emit("history of navigation", history);
        // socket.on('pseudo du gamer', (msg) => {
        //     console.log('message recu sur le navigateur: ' + msg);
        // });
        socket.on("only one player", (msg) => {
            setPseudoPlayerOne(msg);
            setMessageOnePlayer(`bienvenue ${ msg }`);
            socket.emit("start game");
            setMessageAllPlayer("Le jeu va commencer dans 10 secondes.");
        });

        socket.on("current question", (msg) => {
            setCurrentQuestion(msg);
            setMessageOnePlayer("");
            setMessageAllPlayer("");
        });
        socket.on("response a", (msg) => {
            setResponseA(msg);
        });
        socket.on("response b", (msg) => {
            setResponseB(msg);
        });
        socket.on("response c", (msg) => {
            setResponseC(msg);
        });
        socket.on("response d", (msg) => {
            setResponseD(msg);
        });

        socket.on("counter number", (msg) => {
            setNumberTimer(msg);
        });
        socket.on("bonne reponse", (msg) => {
            setscorePlayerOne(msg);
            setMessageAllPlayer("Bonne Réponse");
            setTimeout(socket.emit("start game"), 3000); 
        });
        socket.on("Game Over", (msg) => {
            setMessageAllPlayer("Le Quizz est terminé");
        });
        
        console.log("history dans game === ", history);

    },[history]);


      const handleResponseA = () => {
            console.log("la réponse du jour est ", "a");
            setPlayerResponse("a");
        };
      const handleResponseB = () => {
            console.log("la réponse du jour est ", "b");
            setPlayerResponse("b");
        };
      const handleResponseC = () => {
            console.log("la réponse du jour est ", "c");
            setPlayerResponse("c");
        };
      const handleResponseD = () => {
            console.log("la réponse du jour est ", "d");
            setPlayerResponse("d");
        };
    
    console.log("pseudoPlayerOne", pseudoPlayerOne);

    return (
        <main id="container_playground">
            <section id="playground">
                <header id="timer">
                    <article id="timer_number">{ numberTimer }</article>
                </header>
                <aside id="side_left">
                    <div>Joueur 1</div>
                    {/* <div>{ history.location.state }</div> */}
                    <div>{ pseudoPlayerOne }</div>
                    <div>score :<span id="score_player_two"> { scorePlayerOne } </span></div>
                </aside>
                <aside id="side_middle">
                    <section id="message">
                        <div id="message_one_player">{  messageOnePlayer }</div>
                        <div id="message_all_players">{ messageAllPlayer }</div>
                    </section>
                    { currentQuestion && 
                        <div>
                          <section id="question">
                            {/* <h2>Question</h2> */}
                            <div>{ currentQuestion }</div>
                          </section>
                          <section id="responses">
                            <div id="response_a" onClick={ handleResponseA }>A: { responseA }</div>
                            <div id="response_b" onClick={ handleResponseB }>B: { responseB }</div>
                            <div id="response_c" onClick={ handleResponseC }>C: { responseC }</div>
                            <div id="response_d" onClick={ handleResponseD }>D: { responseD }</div>
                          </section> 
                        </div>
                    }                  
                </aside>
                <aside id="side_right">
                    {/* <div>Joueur 2</div> */}
                    {/* <div>nom 2</div>
                    <div>score :<span id="score_player_two"> 0</span></div> */}
                </aside>    
            </section>
        </main>
    );
}

export default Game;