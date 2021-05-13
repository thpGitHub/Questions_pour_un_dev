import  React from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(document.querySelector('#pseudo').value==="" ||
            document.querySelector('#pwd').value==="") {
            console.log('toto');
            document.querySelector('#message_login').innerHTML = 'veuillez remplir tous les champs';
            document.querySelector('form').reset();

            axios
			.get("/controllers/loginController")
			.then((users) => console.log(users))
			.catch((err) => console.log(err));

        } else {
            console.log('Enter in handleSummit');
            history.push('/choose_game');
            
        }
    }
    //vérification au keyup si tous les champs sont remplis on supprime le message 'veuillez remplir tous les champs'
    const handleKeyUp = () => {
        console.log('key up function enter :)');
        if(document.querySelector('#pseudo').value !=="" && 
           document.querySelector('#pwd').value !=="") {
               document.querySelector('#message_login').innerHTML = " ";

        }
    }

    return (
        <div>
            {/* <form id="login" action="/verify_pseudo_pwd" method="post"> */}
            <form id="login" onSubmit={ e=> handleSubmit(e) } onKeyUp={ handleKeyUp }>
                <h1>LOGIN</h1>
                <div id="message_login"></div>
                <input type="text"     name="pseudo" id="pseudo" placeholder="Pseudo" autoComplete="off" spellCheck="false" />
                <input type="password" name="pwd"    id="pwd"    placeholder="Password"/>
                <input type="submit"   name="submit" value="Login"/>
                <a href="/registration">Create an Account</a>
            </form>
        </div>
    );
}

export default Login;