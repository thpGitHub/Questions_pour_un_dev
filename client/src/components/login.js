import  React, { useState, useEffect } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const [allLogin, setAllLogin]   = useState("null");
    const [pseudo, setPseudo]       = useState("");
    const [privilege, setPrivilege] = useState("");
    const [pwd, setPwd]             = useState("");
    const [message, setMessage]     = useState("");

    useEffect(() => {
        axios
			.get("/loginAll")
			.then((allLogin) => setAllLogin(allLogin))
			.catch((err) => console.log(err));
    },[]);

    const history = useHistory(pseudo);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!pseudo || !pwd) {
            console.log("dans remplir tous les champs");
            setMessage('veuillez remplir tous les champs');
            console.log("message 2 ===", message);
            return;
        }

        console.log(allLogin.data.length);
        console.log(allLogin);

        for(let i=0; i<allLogin.data.length; i++) {
            console.log("dans boucle for",allLogin.data[i]);
            if(allLogin.data[i].pseudo === pseudo && allLogin.data[i].password === pwd) {
                // console.log("allLogin.data[i].privileges === ", allLogin.data[i].privileges);
                // setPrivilege(allLogin.data[i].privileges);
                // console.log("setPrivilege === ", privilege);
                // savePeudoOnServer = pseudo;
                // axios
			    //     .post('/savePseudoOnServer', {
				//         pseudo: pseudo,
                //         privilele: allLogin.data[i].privileges
			    //     })
			    //     .then(function () {
                //         /*
                //          * Par default le premier paramètre de la methode push de l'objet
                //          * history est  le pathname (ici /choose_game).
                //          * Le deuxieme paramètre est le state (ici pseudo).
                //          * On y accède par objetHistory.location.state.
                //          * ATTENTION :  L'history est l'historique de la page
                //          * et il faut ajouter(créer) le state dans la route sur chaque page ('/choose_game', pseudo)
                //          */
                //         // return history.push('/choose_game', pseudo);
                //         return history.push('/choose_game', { pseudo: pseudo,
                //                                               privilege: allLogin.data[i].privileges
                //                                             });
			    //     })
			    //     .catch(function () {
				//         alert("Not savePseudoOnServer");
                //         window.location.reload();
			    //     });

                // history.push('/choose_game', pseudo);
                history.push('/choose_game', { pseudo: pseudo,
                                               privilege: allLogin.data[i].privileges
                                             });
            }
        }
        setMessage("speudo et/ou mot de passe incorrect")
    }

    /*
    * vérification au keyup si tous les champs sont remplis on supprime le message 'veuillez remplir tous les champs'
    */
    const handleKeyUp = () => {
        console.log('key up function enter :)');
        
        if(pseudo !== "" && pwd !== "") {
            setMessage("");
        }
    }

    return (
        <div>
            {/* <form id="login" action="/verify_pseudo_pwd" method="post"> */}
            <form id="login" onSubmit={ e=> handleSubmit(e) } onKeyUp={ handleKeyUp }>
                <h1>LOGIN</h1>
                <div id="message_login">{ message }</div>
                <input
                    id="pseudo"
                    name="pseudo"
                    type="text"
                    onChange={ (e) => setPseudo(e.target.value) }
                    spellCheck="false"
                    placeholder="Pseudo"
                    autoComplete="off"
                />
                <input 
                    id="pwd"
                    name="pwd"
                    type="password"
                    onChange={ (e) => setPwd(e.target.value) }
                    placeholder="Password"
                />
                <input type="submit"   name="submit" value="Login"/>
                <a href="/registration">Create an Account</a>
            </form>
        </div>
    );
}

export default Login;