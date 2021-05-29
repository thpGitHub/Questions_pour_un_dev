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
    const [pseudoPlayerOne, setPseudoPlayerOne] = useState("");
    const [numberTimer, setNumberTimer] = useState(15);
    const [allQuestions, setAllQuestions] = useState();
    const [messageOnePlayer, setMessageOnePlayer] = useState("");
    const [messageAllPlayer, setMessageAllPlayer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [responseA, setResponseA] = useState("");
    const [responseB, setResponseB] = useState("");
    const [responseC, setResponseC] = useState("");
    const [responseD, setResponseD] = useState("");
    const [playerResponse, setPlayerResponse] = useState("");

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
        // socket.on("FromAPI", data => {
        //   setResponse(data);
        //   console.log(response);
        // })
        // const socket = socketIOClient(ENDPOINT);
        console.log("history dans game === ", history);
        setAllQuestions(history);
        console.log("setAllQuestions === ", history.location.state.allQuestions);
        
        // setPseudoPlayer(history.location.state);
        // if(!pseudoPlayer) {
        //     console.log("c'est possible");
        //     console.log(pseudoPlayer);
        //}
        if(playerResponse) {
            console.log("YouHou response du joueur");
        }

      },[]);

      useEffect(() => {
        
        console.log("pseudoPlayerOnePlussss", pseudoPlayerOne);
     });

      const handleResponseA = () => {
            console.log("la réponse du jour est ", responseA);
            setPlayerResponse(responseA);
        };
    //   const socket = socketIOClient(ENDPOINT);
    //   console.log("socket === ", socket);


    //   setSocket.emit('chat message', "toitoi");
    // const history = useHistory();
    
    // for(let i=0; i<1; i++) {
    //     const pseudo = history.location.state;
    //     return setPseudoPlayer(pseudo);
    // }
    
    // setPseudoPlayer(history.location.state);
    console.log("pseudoPlayerOne", pseudoPlayerOne);
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
                    <div>{ pseudoPlayerOne }</div>
                    <div>score :<span id="score_player_two"> 0</span></div>
                </aside>
                <aside id="side_middle">
                    <section id="message">
                        <div id="message_one_player">{  messageOnePlayer }</div>
                        <div id="message_all_players">{ messageAllPlayer }</div>
                    </section>
                    <section id="question">
                        {/* <h2>Question</h2> */}
                        <div>{ currentQuestion }</div>
                    </section>
                    <section id="responses">
                        <div id="response_a" onClick={handleResponseA}>A: { responseA }</div>
                        <div id="response_b">B: { responseB }</div>
                        <div id="response_c">C: { responseC }</div>
                        <div id="response_d">D: { responseD }</div>
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