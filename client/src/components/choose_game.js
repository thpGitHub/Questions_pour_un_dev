import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import './choose_game.css';
//import { RouteComponentProps } from 'react-router-dom';

// const Choose_Game = (propsPseudo) => {
const Choose_Game = () => {
    const [pseudo, setPseudo] = useState("");
    const [privilege, setPrivilege] = useState("");
    const [allQuestions, setAllQuestions] = useState("");

    // const props = "totoo";
    // console.log('pseudoProps===', propsPseudo);
    // console.log('pseudoPropsDetail===', propsPseudo.location.state);
    // const history = useHistory(props);
    const history = useHistory();

    useEffect(() => {
        setPseudo(history.location.state.pseudo);
        setPrivilege(history.location.state.privilege);

        // axios
		// 	.get("/questionsAll")
		// 	.then((allQuestions) => setAllQuestions(allQuestions))
		// 	.catch((err) => console.log(err));

    },[]);

    console.log('history dans choose game === ',history);
    console.log('history.location.state.pseudo dans choose game === ',history.location.state.pseudo);
    console.log('pseudo dans choose game === ',pseudo);
    console.log('allQuestions.data dans choose game === ',allQuestions.data);
    console.log('allQuestions choose game === ',allQuestions);


    const handleSubmitOnePlayer = (e) => {
        e.preventDefault();
    console.log('history dans choose game === ',history);
        
        return history.push('/game', { pseudo: pseudo,
                                       player: "one",
                                       allQuestions: allQuestions.data
                                     });

        // history.push("/game", history.location.state);
        // history.push("/game", history.location.state);
        
    }
    const handleSubmitTwoPlayer = (e) => {
        e.preventDefault();
        console.log("in handleSubmitTwoPlayer");
        history.push("/game");
    }
    const handleSubmitAdminPlayer = (e) => {
        e.preventDefault();
        console.log("in handleSubmitTwoPlayer");
        history.push("/admin");
    }

    return (
        <form id="chooseGame">
            <input 
                id="submitOnePlayer"
                type="submit"
                value="Un Joueur"
                onClick={ e => handleSubmitOnePlayer(e) }/>
            <input 
                id="submitTwoPlayer" 
                type="submit"
                value="Deux Joueurs"
                onClick={ e => handleSubmitTwoPlayer(e) }/>
            <input 
                id="submitAdmin" 
                type="submit" 
                value="Administration"
                onClick={ e => handleSubmitAdminPlayer(e) }/>
        </form>
    );
}

export default Choose_Game;