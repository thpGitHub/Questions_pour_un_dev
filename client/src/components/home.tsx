import React from 'react';
import './home.css';
import { useHistory } from 'react-router-dom';

const Home = () => {

    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('Enter in handleSummit');
        history.push('/login');
    }

    return (
        // <form action="/login" method="post">
        <form id="home" onSubmit={ e => handleSubmit(e) }>
            <h3>Bienvenue sur :</h3>
            <h1>Questions pour un développeur</h1>
            <input type="submit" value="Merci de vous logger"/>
      </form>
    )
}

export default Home;