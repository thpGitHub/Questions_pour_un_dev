import  React, { useState, useEffect } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const [allLogin, setAllLogin] = useState("null");
    const [pseudo, setPseudo]     = useState("");
    const [pwd, setPwd]           = useState("");
    const [message, setMessage]   = useState("");

    useEffect(() => {
        axios
			.get("/loginAll")
			.then((allLogin) => setAllLogin(allLogin))
			.catch((err) => console.log(err));
    },[]);

    const history = useHistory();

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
                console.log("pseudo pareil que dans BDD");
                history.push('/choose_game');
            }
        }
        setMessage("speudo et/ou mot de passe incorrect")
    }

    //vérification au keyup si tous les champs sont remplis on supprime le message 'veuillez remplir tous les champs'
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
                    onChange={ (e) => setPseudo(e.target.value) }
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    placeholder="Pseudo"
                    autoComplete="off"
                    spellCheck="false"
                />
                <input 
                    onChange={ (e) => setPwd(e.target.value) }
                    type="password"
                    name="pwd"
                    id="pwd"
                    placeholder="Password"
                />
                <input type="submit"   name="submit" value="Login"/>
                <a href="/registration">Create an Account</a>
            </form>
        </div>
    );
}

export default Login;