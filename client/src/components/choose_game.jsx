import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './choose_game.css';

const Choose_Game = () => {
    const [pseudo, setPseudo] = useState("");
    const [privilege, setPrivilege] = useState("");
    
    const history = useHistory();
    const historyPrivilege = history.location.state.privilege;
    const historyPseudo = history.location.state.pseudo;

    useEffect(() => {
        // setPseudo(history.location.state.pseudo);
        setPseudo(historyPseudo);
        setPrivilege(historyPrivilege);
        // console.log("privilège in choose game === ", privilege);
    },[]);

    console.log('history dans choose game === ',history);
    console.log('history.location.state.pseudo dans choose game === ',history.location.state.pseudo);
    console.log('pseudo dans choose game === ',pseudo);
    
    const handleSubmitOnePlayer = (e) => {
        e.preventDefault();
    console.log('history dans choose game === ',history);
        
        return history.push('/game', { pseudo: pseudo,
                                       player: "one",
                                    //    allQuestions: allQuestions.data
                                     });
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
            { privilege === "admin" && 
                <input 
                    id="submitAdmin" 
                    type="submit" 
                    value="Administration"
                    onClick={ e => handleSubmitAdminPlayer(e) }/>
            }
            
        </form>
    );
}

export default Choose_Game;