import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './registration.css';

const Registration = () => {

    const [allLogin, setAllLogin] = useState("null"),
          [message_registration_fields_empty, setMessageRegistrationFieldsEmpty] = useState(""),
          [message_registration_pseudo, setMessageRegistrationPseudo] = useState(""),
          [message_registration_pwd, setMessageRegistrationPwd] = useState(""),
          [pseudo, setPseudo] = useState(""),
          [pwd, setPwd] = useState(""),
          [confirmPwd, setConfirmPwd] = useState("");

    useEffect( () => {
        axios
            .get("/loginAll")
            .then((allLogin) => setAllLogin(allLogin))
            .catch((err) => console.log(err))
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(!checkSamePwd(e));

        if(!pseudo || !pwd || !confirmPwd) {
            return setMessageRegistrationFieldsEmpty('Veuillez remplir tous les champs');
            // return;
        }
        if(!checkSamePwd(e)) {
            // console.log(checkSamePwd(e));
           return setMessageRegistrationPwd('Mots de passes pas identiques');
        }
        axios
			.post("/loginSave", {
				name: pseudo,
				email: pwd,
			})
			.then(function () {
				alert("Account created successfully");
				// window.location.reload();
			})
			.catch(function () {
				alert("Could not creat account. Please try again");
			});
    }

    /*
     *   Penser a limiter la longueur du pseudo a 10
    */
    const checkPseudo = (e) => {
        
        for(let i=0; i<allLogin.data.length; i++) {  
            if(allLogin.data[i].pseudo === e.target.value) {
                setMessageRegistrationPseudo(`Le pseudo "${e.target.value}" est déjà pris !`);
            }
        }
    }
    /*
    * target[1] correspond à l'input#password 
    * target[2] correspond à l'input#confirmpassword 
    */
    const checkSamePwd = (e) => {
        if(e.target[1].value === e.target[2].value) {
            return true;
        }
        return false;
    }
    /*
    *vérification au keyup si tous les champs sont remplis on supprime le message 'veuillez remplir tous les champs'
    *et le message 'Mots de passes pas identiques'
    */
    const handleKeyUp = () => {
        console.log('key up function enter :)');
        
        if(pseudo !== "" && pwd !== "" && confirmPwd !=="") {
            setMessageRegistrationFieldsEmpty("");
            setMessageRegistrationPwd("");
        }
    }

    return (
        <form id="registration" onSubmit={ e => handleSubmit(e) } onKeyUp={ handleKeyUp }>
            <h1>Inscription</h1>
            <div id="pseudo_keep"></div>

            <div id="message_registration_fields_empty">{ message_registration_fields_empty }</div>
           
            <label htmlFor="pseudo"></label>
            <input 
                id="pseudo" 
                type="text" 
                placeholder="pseudo" 
                name="pseudo" 
                autoComplete="off" 
                spellCheck="false"
                onChange={ (e) => checkPseudo(e) }
                onChange={ (e) => setPseudo(e.target.value) }
            />

            <div id="message_registration_pseudo">{ message_registration_pseudo }</div>
            
            <label htmlFor="password"></label>
            <input id="password" 
                type="password" 
                placeholder="Mot de passe" 
                name="password"
                onChange={ (e) => setPwd(e.target.value) }
                />

            <div id="message_registration_pwd">{ message_registration_pwd }</div>

            <label htmlFor="confirm_password"></label>
            <input id="confirm_password"
                type="password" 
                placeholder="Confirmer le mot de passe" 
                name="confirm_password"
                onChange={ (e) => setConfirmPwd(e.target.value) }
                />

            <input type="submit" value="Valider" name="valid_registration"/>
        </form>
    );
}

export default Registration;