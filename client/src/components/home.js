import './home.css';

const Home = () => {

    return (
        <form action="/login" method="post">
            <h3>Bienvenue sur :</h3>
            <h1>Questions pour un développeur</h1>
            <input type="submit" value="Merci de vous logger"/>
      </form>
    )
}

export default Home;