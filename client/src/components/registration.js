import './registration.css';

const Registration = () => {

    return (
        <form id="registration" action="/check/registration" method="post">
            <h1>Inscription</h1>
            <div id="pseudo_keep"></div>

            <label htmlFor="pseudo"></label>
            <input id="pseudo" type="text" placeholder="pseudo" name="pseudo" autoComplete="off" spellCheck="false"/>

            <label htmlFor="password"></label>
            <input id="password" type="password" placeholder="Mot de passe" name="password"/>

            <div id="password_not_same"></div>

            <label htmlFor="confirm_password"></label>
            <input id="confirm_password" type="password" placeholder="Confirmer le mot de passe" name="confirm_password"/>

            <input type="submit" value="Valider" name="valid_registration"/>
        </form>
    );
}

export default Registration;