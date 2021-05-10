import './login.css';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Enter in handleSummit');
        history.push('/choose_game');
    }

    return (
        <div>
            {/* <form id="login" action="/verify_pseudo_pwd" method="post"> */}
            <form id="login" onSubmit={ e=> handleSubmit(e)}>
                <h1>LOGIN</h1>
                <div id="message_login"></div>
                <input type="text"     name="pseudo" placeholder="Pseudo" autoComplete="off" spellCheck="false"/>
                <input type="password" name="pwd"    placeholder="Password"/>
                <input type="submit"   name="submit" value="Login"/>
                <a href="/inscription">Create an Account</a>
            </form>
        </div>
    );
}

export default Login;