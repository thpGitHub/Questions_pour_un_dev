import  React, { useState, useEffect } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [allLogin, setAllLogin]   = useState<any>();
    const [pseudo, setPseudo]       = useState("");
    // const [privilege, setPrivilege] = useState("");
    const [pwd, setPwd]             = useState("");
    const [message, setMessage]     = useState("");

    useEffect(() => {
        axios
			.get("/loginAll")
			.then((allLogin) => setAllLogin(allLogin))
			.catch((err) => console.log(err));
    },[]);

    // const history = useHistory(pseudo);
    const history = useHistory();
    console.log("history ===", history);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("allLogin === ", allLogin);
        
        if(!pseudo || !pwd) {
            setMessage('veuillez remplir tous les champs');
            return;
        }

        for(let i=0; i<allLogin.data.length; i++) {
            if(allLogin.data[i].pseudo === pseudo && allLogin.data[i].password === pwd) {
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
    const handleKeyUp = (): void => {
        console.log('key up function enter :)');
        
        if(pseudo !== "" && pwd !== "") {
            setMessage("");
        }
    }

    return (
        <div>
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