import  React, { useState, useEffect } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// const axios = require('axios').default;

import AuthenticateService from '../services/authentication-services';

const Login = () => {

    const [allLogin, setAllLogin]   = useState<any>();
    const [pseudo, setPseudo]       = useState<string>("");
    // const [privilege, setPrivilege] = useState("");
    const [pwd, setPwd]             = useState<string>("");
    const [message, setMessage]     = useState<string>("");

    useEffect(() => {
        
        // console.log('tesssssst', AuthenticateService.login("toto", "toto").then());
        // AuthenticateService.login("tooto", "toto").then((data) => { console.log('ouaisisiisiisd',data)});
        // const a =AuthenticateService.login("tooto", "toto");
        // a.then((data) => { console.log('ouaisisiisiisd',data)});

        // useEffect(() => {
        //     async function fetchMyAPI() {
        //       let response = await fetch('api/data')
        //       response = await response.json()
        //       dataSet(response)
        //     }

        // async function anyNameFunction() {
        //     // const w = await AuthenticateService.login("tooto", "toto");
        //     let x = await AuthenticateService.verifyLogin();
        //     x = await x;
        //     console.log('qdqdsqdsq',x);
        //   }    // Execute the created function directly
          
        // anyNameFunction();
        // AuthenticateService.getAllLogins();
        
        // AuthenticateService.verifyLogin();
        

        // axios
		// 	.get("/loginAll")
		// 	.then((allLogin) => setAllLogin(allLogin))
		// 	.catch((err) => console.log(err));
    },[]);

    // const history = useHistory(pseudo);
    const history = useHistory();
    console.log("history ===", history);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        //*****
            // AuthenticateService.verifyLogin(pseudo, pwd).then(res => {console.log("res in login.tsx ===", res)});
        
        //******
        console.log("allLogin === ", allLogin);
        
        if(!pseudo || !pwd) {
            setMessage('veuillez remplir tous les champs');
            return;
        }

        AuthenticateService.verifyLogin(pseudo, pwd).then(res => {console.log("res in login.tsx ===", res);
                                                                  if(!res) {
                                                                    setMessage("speudo et/ou mot de passe incorrect");
                                                                    return;
                                                                  }
                                                                //   history.push('/choose_game', { pseudo: pseudo,
                                                                //                                  privilege: allLogin.data[i].privileges
                                                                //                                 });
    });

        // for(let i=0; i<allLogin.data.length; i++) {
        //     if(allLogin.data[i].pseudo === pseudo && allLogin.data[i].password === pwd) {
        //         history.push('/choose_game', { pseudo: pseudo,
        //                                        privilege: allLogin.data[i].privileges
        //                                      });
        //     }
        // }
        // setMessage("speudo et/ou mot de passe incorrect")
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