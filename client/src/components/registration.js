import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './registration.css';

const Registration = () => {

    const [allLogin, setAllLogin] = useState("null"),
          [message_registration_fields_empty, setMessageRegistrationFieldsEmpty] = useState(""),
          [message_registration_pseudo, setMessageRegistrationPseudo] = useState(""),
          [message_registration_pwd, setMessageRegistrationPwd] = useState(""),
          [pseudo, setPseudo] = useState(""),
          [pwd, setPwd] = useState("");

    useEffect( () => {
        axios
            .get("/loginAll")
            .then((allLogin) => setAllLogin(allLogin))
            .catch((err) => console.log(err))
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("alllogin in registration ===", allLogin);

        if(!pseudo || !pwd) {
            console.log("dans remplir tous les champs");
            setMessageRegistrationFieldsEmpty('veuillez remplir tous les champs');
           
            return;
        }
    }

    return (
        <form id="registration" onSubmit={ e => handleSubmit(e) }>
            <h1>Inscription</h1>
            <div id="pseudo_keep"></div>

            <div id="message_registration_fields_empty">{ message_registration_fields_empty }</div>
            <label htmlFor="pseudo"></label>
            <input id="pseudo" type="text" placeholder="pseudo" name="pseudo" autoComplete="off" spellCheck="false"/>

            <div id="message_registration_pseudo">{ message_registration_pseudo }</div>
            <label htmlFor="password"></label>
            <input id="password" type="password" placeholder="Mot de passe" name="password"/>

            <div id="message_registration_pwd">{ message_registration_pwd }</div>

            <label htmlFor="confirm_password"></label>
            <input id="confirm_password" type="password" placeholder="Confirmer le mot de passe" name="confirm_password"/>

            <input type="submit" value="Valider" name="valid_registration"/>
        </form>
    );
}

export default Registration;